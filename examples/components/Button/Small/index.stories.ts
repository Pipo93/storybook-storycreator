import { createStory, StoryKind } from '../../../../src'
import type { ComponentStoryConfig } from '../../../../src'
import propsSchema from './docs/api.json'
import { examples } from './docs/examples'
import SmallButton, { SmallButtonProps } from '.'

const smallButtonConfig: ComponentStoryConfig<SmallButtonProps> = {
    // createIssueLink: '',
    componentImportPath: '@pipo93/react-styleguide',
    tabs: [
        {
            type: 'USAGE',
            sections: ['IMPORT_EXAMPLE', 'DIVIDER', 'EXAMPLES'],
        },
        { type: 'API_DOCUMENTATION', sections: ['PROPS_API'] },
        { type: 'PLAYGROUND', sections: [] },
    ],
    title: 'Small Button',
    // sourceLink: '',
    component: SmallButton,
    headerComponentProps: {
        children: 'Button',
        type: 'black',
        onPress: (): void => alert('onPress triggered'),
    },
    componentExportName: 'SmallButton',
    propsSchema,
    examples,
}

createStory({
    storyPath: 'Stories / Components',
    storyName: 'Small Button',
    type: StoryKind.COMPONENT,
    config: smallButtonConfig,
})
