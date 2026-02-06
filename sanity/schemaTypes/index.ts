import { type SchemaTypeDefinition } from 'sanity'
import author from './author'
import project from './project'
import settings from './settings'
import secretMessage from './secretMessage'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [author, project, settings, secretMessage],
}
