import { assertNotNull } from '@subsquid/util-internal'
import { lookupArchive } from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
// ...
import * as bayc from './abi/bayc'

export const CONTRACT_ADDRESS = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'

export const processor = new EvmBatchProcessor()
    .setGateway(lookupArchive('eth-mainnet'))
    .setRpcEndpoint({
        url: 'https://eth-mainnet.g.alchemy.com/v2/PdAq5ydIInbxKVSOmwTD5TIYk51FnMXD',
        rateLimit: 10
    })
    .setFinalityConfirmation(75)
    .setBlockRange({
        from: 12_287_507,
    })
    .addLog({
        address: [CONTRACT_ADDRESS],
        topic0: [bayc.events.Transfer.topic]
    })
    .setFields({
        log: {
            transactionHash: true
        }
    })
