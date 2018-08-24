// Not the nicest way to do this but !time!
export const listenToEvent = (event_type, data={}) => {

    window.postMessage({ type: event_type, text: data }, "*");

    return new Promise((resolve, reject) => {
        setTimeout(reject, 10000);
        window.addEventListener('message', (event) => {
            const { source, data } = event
    
            // We only accept messages from ourselves
            if (source !== window) {
              return
            }
        
            const { type } = data
            const type_response = event_type + '_RESPONSE';

            if (type == type_response) {
                resolve(data.result);
            }
        });
    });
}