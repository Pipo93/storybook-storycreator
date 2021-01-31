import { createStory, StoryKind } from '../../../src'
import type { ComponentStoryConfig } from '../../../src'
import propsSchema from './docs/api.json'
import WithBasicProps, { Props } from '.'

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
                        booleanValue: false,
                        numberValue: 32,
                        stringValue: 'initial',
                    },
                },
            ],
        },
    ],
    title: 'With basic props',
    sourceLink:
        'https://github.com/Pipo93/storybook-storycreator/blob/master/examples/components/WithBasicProps/index.tsx',
    component: WithBasicProps,
    propsSchema,
    componentExportName: 'WithBasicProps',
}

createStory({
    storyPath: 'Examples / API Doku Tab',
    storyName: 'with basic props',
    type: StoryKind.COMPONENT,
    config,
})
