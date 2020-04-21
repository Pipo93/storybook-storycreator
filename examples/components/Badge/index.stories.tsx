import { ComponentStoryConfig, createStory, StoryKind } from '../../../src'

import propsSchema from './docs/api.json'
import { examples } from './docs/examples'
import Badge, { BadgeProps } from '.'

const badgeConfig: ComponentStoryConfig<BadgeProps> = {
    componentImportPath: '@pipo93/react-styleguide',
    title: 'Badge',
    // createIssueLink: '',
    // sourceLink: '',
    component: Badge,
    headerComponentProps: {
        children: 42,
        type: 'black',
    },
    // API Doku:
    propsSchema,
    componentExportName: 'Badge',
    tabs: [
        {
            type: 'USAGE',
            sections: ['IMPORT_EXAMPLE', 'DIVIDER', 'EXAMPLES'],
        },
        { type: 'API_DOCUMENTATION', sections: ['PROPS_API'] },
        { type: 'PLAYGROUND', sections: [] },
    ],
    examples,
}

createStory({
    storyPath: 'Stories / Components',
    storyName: 'Badge',
    type: StoryKind.COMPONENT,
    config: badgeConfig,
})
