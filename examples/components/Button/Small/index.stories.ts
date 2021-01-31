import { createStory, StoryKind } from '../../../../src'
import type { ComponentStoryConfig } from '../../../../src'
import propsSchema from './docs/api.json'
import { examples } from './docs/examples'
import SmallButton, { SmallButtonProps } from '.'

const smallButtonConfig: ComponentStoryConfig<SmallButtonProps> = {
    createIssueLink: 'https://github.com/Pipo93/storybook-storycreator/issues/new',
    componentImportPath: '@pipo93/react-styleguide',
    tabs: [
        {
            type: 'USAGE',
            sections: ['IMPORT_EXAMPLE', 'DIVIDER', 'EXAMPLES'],
        },
        { type: 'API_DOCUMENTATION', sections: ['PROPS_API'] },
        {
            type: 'PLAYGROUND',
            sections: [
                {
                    type: 'PLAYGROUND',
                    initialProps: {
                        type: 'black',
                        children: 'Button',
                        onPress: (): void => alert('onPress triggered'),
                    },
                    callbackPropPrinted: {
                        onPress: "(): void => alert('onPress triggered')",
                    },
                },
            ],
        },
    ],
    title: 'Small Button',
    sourceLink:
        'https://github.com/Pipo93/storybook-storycreator/blob/master/examples/components/Button/Small/index.tsx',
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
