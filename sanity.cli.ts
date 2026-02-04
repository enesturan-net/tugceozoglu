import { defineCliConfig } from 'sanity/cli'
import { projectId, dataset } from './sanity/env'

export default defineCliConfig({
    api: {
        projectId: projectId || '',
        dataset: dataset || '',
    },
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
})
