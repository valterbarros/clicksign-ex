export const envelope = (origin, apiData) => {
  const createEnvelope = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apiData.token);
    myHeaders.append("Content-Type", "application/vnd.api+json");
  
    var raw = JSON.stringify({
      data: {
        type: "envelopes",
        attributes: {
          name: "Documento envelope",
          locale: "pt-BR",
          auto_close: true,
          block_after_refusal: true
        }
      }
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
  
    const res = await fetch(`${origin}/api/v3/envelopes`, requestOptions);
    return await res.json();
  };
  
  const addDocumentToEnvelope = async (base64, envelopeKey, name) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apiData.token);
    myHeaders.append("Content-Type", "application/vnd.api+json");
  
    var raw = JSON.stringify({
      data: {
        type: "documents",
        attributes: {
          filename: `${name}_${(new Date).toLocaleTimeString()}.pdf`,
          content_base64: base64,
        }
      }
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    const res = await fetch(`${origin}/api/v3/envelopes/${envelopeKey}/documents`, requestOptions)
    return await res.json();
  }
  
  const addSignerToEnvelope = async (envelopeKey, signerEmail, auth) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apiData.token);
    myHeaders.append("Content-Type", "application/vnd.api+json");
  
    var raw = JSON.stringify({
      data: {
        type: "signers",
        attributes: {
          name: `João Silva (${auth})`,
          birthday: "1971-06-28",
          email: signerEmail,
          phone_number: "11999999999",
          documentation: "560.723.861-05",
          communicate_events: {
            signature_request: "email",
            document_signed: "email"
          }
        }
      }
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    const res = await fetch(`${origin}/api/v3/envelopes/${envelopeKey}/signers`, requestOptions)
    return await res.json();
  }
  
  const addRequeriment = async (envelopeKey, signerKey, documentKey) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apiData.token);
    myHeaders.append("Content-Type", "application/vnd.api+json");
  
    var raw = JSON.stringify({
      data: {
        type: "requirements",
        attributes: {
          action: "agree",
          role: "sign"
        },
        relationships: {
          document: {
            data: {
              type: "documents",
              id: documentKey
            }
          },
          signer: {
            data: {
              type: "signers",
              id: signerKey
            }
          }
        }
      }
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    await fetch(`${origin}/api/v3/envelopes/${envelopeKey}/requirements`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  const addProofRequeriment = async (envelopeKey, signerKey, documentKey, auth) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apiData.token);
    myHeaders.append("Content-Type", "application/vnd.api+json");
  
    var raw = JSON.stringify({
      data: {
        type: "requirements",
        attributes: {
          action: "provide_evidence",
          auth,
        },
        relationships: {
          document: {
            data: {
              type: "documents",
              id: documentKey
            }
          },
          signer: {
            data: {
              type: "signers",
              id: signerKey
            }
          }
        }
      }
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    await fetch(`${origin}/api/v3/envelopes/${envelopeKey}/requirements`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  const activateEnvelope = async (envelopeKey) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apiData.token);
    myHeaders.append("Content-Type", "application/vnd.api+json");
  
    var raw = JSON.stringify({
      data: {
        id: envelopeKey,
        type: "envelopes",
        attributes: {
          status: "running",
          name: "Teste",
          locale: "pt-BR",
          auto_close: true,
          remind_interval: 7,
          block_after_refusal: true,
        }
      }
    });
  
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    await fetch(`${origin}/api/v3/envelopes/${envelopeKey}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  const listRunningEnvelopes = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apiData.token);
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    const res = await fetch(`${origin}/api/v3/envelopes?filter[status]=running&sort=-created`, requestOptions)
    return await res.json();
  }
  
  const getSignersEnvelope = async (envelopeKey) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apiData.token);
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    const res = await fetch(`${origin}/api/v3/envelopes/${envelopeKey}/signers`, requestOptions)
    return await res.json();
  }

  const getEventsEnvelope = async (envelopeKey) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apiData.token);
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    const res = await fetch(`${origin}/api/v3/envelopes/${envelopeKey}/events`, requestOptions)
    return await res.json();
  }

  const getDocumentsEnvelope = async (envelopeKey) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apiData.token);
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    const res = await fetch(`${origin}/api/v3/envelopes/${envelopeKey}/documents`, requestOptions)
    return await res.json();
  }

  return {
    createEnvelope,
    addDocumentToEnvelope,
    addSignerToEnvelope,
    addRequeriment,
    addProofRequeriment,
    activateEnvelope,
    listRunningEnvelopes,
    getSignersEnvelope,
    getEventsEnvelope,
    getDocumentsEnvelope,
  };
};
