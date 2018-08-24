import Neon, { rpc, u } from '@cityofzion/neon-js';
import bs58 from 'bs58';

export const setupNeonJS = () => {
    const networkName = process.env.REACT_APP_NETWORK_NAME;
    const neoScanAddress = process.env.REACT_APP_NEOSCAN_ADDRESS;

    const config = {
        name: networkName,
        extra: {
          neoscan: neoScanAddress
        }
    }

    const network = new rpc.Network(config);
      
    Neon.add.network(network);

    return;
}

export const testInvokeContract = (operation, args) => {
    const seedAddress = process.env.REACT_APP_SEED_ADDRESS;
    const script = createScript(operation, args);

    return rpc.Query.invokeScript(script)
    .execute(seedAddress)
}

export const addressToScriptHash = (address) => {
    const bytes = bs58.decode(address)

    if (bytes.length != 25) {
        throw new Error('Invalid address length')
    };
    if (bytes[0] != 23) {
        throw new Error('Incorrect address version')
    };

     // Verify checksum here

    const substr = bytes.slice(1,21)

    return u.ab2hexstring(substr)
}

const createScript = (operation, args) => {
    const scriptHash = process.env.REACT_APP_SCRIPT_HASH;

    const props = {
        scriptHash,
        operation,
        args
    };

    return Neon.create.script(props);
}

