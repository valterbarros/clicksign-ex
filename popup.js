import { envelope } from "./scripts/js/services/envelope.js";
import {
  query,
  getSavedTokenKey,
  setData,
  getAccountId,
  getHost,
  getData,
  getTabById,
} from "./scripts/js/utils/index.js";

void async function() {
  const store = {
    accountId: null,
    savedToKenKey: null,
    origin: null,
    selectedToken: '',
    folderId: null,
  };

  const currentTabId = await getData('currentTabId');

  const { url } = await getTabById(currentTabId);
  const { origin } = new URL(url);
  store.origin = origin;
  store.accountId = getAccountId(url);
  store.savedToKenKey = getSavedTokenKey(getHost(store.origin), store.accountId);
  store.selectedToken = await getData(store.savedToKenKey);

  query('#js-save-token').onsubmit = async (e) => {
    e.preventDefault();
    const token = query('#js-token').value;
  
    if (!token) return;
  
    await setData(store.savedToKenKey, token);
  
    location.reload();  
  }
  
  /**
   * 
   * @param {File} file 
   */
  const asyncReadDocument = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    return await new Promise((resolve) => {
      reader.onload = (data) => resolve(data.target.result);
    });
  }
  
  query('#js-send-document-form').onsubmit = async function onChangeFile(e) {
    e.preventDefault();
  
    const submit = query('[type="submit"]', e.target);
    submit.disabled = true;
  
    const file = query('#js-add-document').files[0];
  
    const fileBase64 = await asyncReadDocument(file);
  
    const auth = query('#js-signature-type').value;
  
    const {
      createEnvelope,
      addDocumentToEnvelope,
      addSignerToEnvelope,
      addRequeriment,
      addProofRequeriment,
      activateEnvelope
    } = envelope(store.origin, { token: store.selectedToken });
  
    const signerEmail = query('#js-email').value;

    try {
      const envelope = await createEnvelope();
      const signer = await addSignerToEnvelope(envelope.data.id, signerEmail, auth);
  
      const document = await addDocumentToEnvelope(fileBase64, envelope.data.id, 'document');
      await addRequeriment(envelope.data.id, signer.data.id, document.data.id);
      await addProofRequeriment(envelope.data.id, signer.data.id, document.data.id, auth);
      await activateEnvelope(envelope.data.id);
    } catch (err){
      alert('erro ao enviar');
      console.log(err);
    } finally {
      submit.disabled = false;
    }
  };
}();
