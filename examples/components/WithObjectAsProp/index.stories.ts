import { createStory, StoryKind } from '../../../src'
import type { ComponentStoryConfig } from '../../../src'
import propsSchema from './docs/api.json'
import WithObjectAsProp, { Props } from '.'

const config: ComponentStoryConfig<Props> = {
    createIssueLink: 'https://github.com/Pipo93/storybook-storycreator/issues/new',
    componentImportPath: '@pipo93/react-styleguide',
    tabs: [
        { type: 'API_DOCUMENTATION', sections: ['PROPS_API'] },
        {
            type: 'PLAYGROUND',
            sections: [
                {
                    type: 'PLAYGROUND',
                    initialProps: {
                        simpleObject: {
                            booleanValue: true,
                            stringValue: "I'm a string",
                            numberValue: 42,
                        },
                    },
                },
            ],
        },
    ],
    title: 'With object as prop',
    sourceLink:
        'https://github.com/Pipo93/storybook-storycreator/blob/master/examples/components/WithObjectAsProp/index.tsx',
    component: WithObjectAsProp,
    propsSchema,
    componentExportName: 'WithObjectAsProp',
}

createStory({
    storyPath: 'Examples / API Doku Tab',
    storyName: 'with object as prop',
    type: StoryKind.COMPONENT,
    config,
})
