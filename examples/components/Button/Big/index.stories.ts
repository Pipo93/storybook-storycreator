import { createStory, StoryKind } from '../../../../src'
import type { ComponentStoryConfig } from '../../../../src'
import propsSchema from './docs/api.json'
import { examples } from './docs/examples'
import BigButton, { BigButtonProps } from '.'

const bigButtonConfig: ComponentStoryConfig<BigButtonProps> = {
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
    title: 'Big Button',
    // sourceLink: '',
    component: BigButton,
    headerComponentProps: {
        children: 'Button',
        type: 'black',
        onPress: (): void => alert('onPress triggered'),
    },
    propsSchema,
    componentExportName: 'BigButton',
    examples,
}

createStory({
    storyPath: 'Stories / Components',
    storyName: 'Big Button',
    type: StoryKind.COMPONENT,
    config: bigButtonConfig,
})
