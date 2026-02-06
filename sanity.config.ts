'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'

import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export default defineConfig({
    basePath: '/studio',
    projectId: projectId || '',
    dataset: dataset || '',
    // Add and edit the content schema in the './sanity/schema' folder
    schema,
    plugins: [
        structureTool({
            structure: (S: any, context: any) => {
                return S.list()
                    .title('Content')
                    .items([
                        // Minimum required configuration
                        orderableDocumentListDeskItem({ type: 'project', title: 'Projects (Drag & Drop)', S, context }),

                        // List out the rest of the document types, but filter out the project type
                        ...S.documentTypeListItems().filter(
                            (listItem: any) => listItem.getId() !== 'project' && listItem.getId() !== 'secretMessage'
                        ),
                    ])
            },
        }),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
    ],
})
