import { createStory, StoryKind } from '../../../src'
import type { ComponentStoryConfig } from '../../../src'
import propsSchema from './docs/api.json'
import WithFunctionAsProp, { Props } from '.'

const config: ComponentStoryConfig<Props> = {
    createIssueLink: 'https://github.com/Pipo93/storybook-storycreator/issues/new',
    componentImportPath: '@pipo93/react-styleguide',
    tabs: [{ type: 'API_DOCUMENTATION', sections: ['PROPS_API'] }],
    title: 'With functions as prop',
    sourceLink:
        'https://github.com/Pipo93/storybook-storycreator/blob/master/examples/components/WithFunctionAsProp/index.tsx',
    component: WithFunctionAsProp,
    propsSchema,
    componentExportName: '',
}

createStory({
    storyPath: 'Examples / API Doku Tab',
    storyName: 'with functions as prop',
    type: StoryKind.COMPONENT,
    config,
})
