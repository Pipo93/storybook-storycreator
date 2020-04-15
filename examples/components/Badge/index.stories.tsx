import type { BasicComponentStoryConfig } from '../../../src'
import { createStory } from '../../../src'

import propsSchema from './docs/api.json'
import { examples } from './docs/examples'
import Badge, { BadgeProps } from '.'

const badgeConfig: BasicComponentStoryConfig<BadgeProps> = {
    componentImportPath: '@pipo/react-styleguide',
    title: 'Badge',
    // createIssueLink: 'https://jira.sport1dev.de/secure/CreateIssue!default.jspa',
    // sourceLink:
    //     'https://gitlab.sport1dev.de/ng/libraries/sport1-styleguide/-/blob/master/src/Badges/index.tsx',
    component: Badge,
    componentProps: {
        children: 42,
        type: 'black',
    },
    // API Doku:
    propsSchema,
    componentExportName: 'Badge',
    componentPath: '..',
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

createStory({ type: 'COMPONENT', config: badgeConfig })
