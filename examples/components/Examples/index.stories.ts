import { createStory, StoryKind } from '../../../src'
import type { ComponentStoryConfig } from '../../../src'
import propsSchema from '../Button/Small/docs/api.json'
import SmallButton, { SmallButtonProps } from '../Button/Small'
import BigButton from '../Button/Big'
import {
    customBackgroundExamples,
    variantsColumnExamples,
    variantsRowExamples,
} from './docs/examples'

const customBackgroundExamplesConfig: ComponentStoryConfig<SmallButtonProps> = {
    createIssueLink: 'https://github.com/Pipo93/storybook-storycreator/issues/new',
    componentImportPath: '@pipo93/react-styleguide',
    tabs: [
        {
            type: 'USAGE',
            sections: ['EXAMPLES'],
        },
    ],
    title: 'With custom background',
    sourceLink:
        'https://github.com/Pipo93/storybook-storycreator/blob/master/examples/components/Examples/docs/examples.tsx#L60',
    component: SmallButton,
    headerComponentProps: {
        children: 'Button',
        type: 'black',
        onPress: (): void => alert('onPress triggered'),
    },
    componentExportName: 'SmallButton',
    propsSchema,
    examples: customBackgroundExamples,
    examplesHeadline: 'How to use a custom background',
}

createStory({
    storyPath: 'Examples / Usage Tab / Examples Section',
    storyName: 'Custom Backgrounds',
    type: StoryKind.COMPONENT,
    config: customBackgroundExamplesConfig,
})

const variantsRowExamplesConfig: ComponentStoryConfig<SmallButtonProps> = {
    createIssueLink: 'https://github.com/Pipo93/storybook-storycreator/issues/new',
    componentImportPath: '@pipo93/react-styleguide',
    tabs: [
        {
            type: 'USAGE',
            sections: ['EXAMPLES'],
        },
    ],
    title: "Usage Examples with variantsDirection 'row'",
    sourceLink:
        'https://github.com/Pipo93/storybook-storycreator/blob/master/examples/components/Examples/docs/examples.tsx#L34',
    component: SmallButton,
    headerComponentProps: {
        children: 'Button',
        type: 'black',
        onPress: (): void => alert('onPress triggered'),
    },
    componentExportName: 'SmallButton',
    propsSchema,
    examples: variantsRowExamples,
}

createStory({
    storyPath: 'Examples / Usage Tab / Examples Section',
    storyName: "variantsDirection 'row'",
    type: StoryKind.COMPONENT,
    config: variantsRowExamplesConfig,
})

const variantsColumnExamplesConfig: ComponentStoryConfig<SmallButtonProps> = {
    createIssueLink: 'https://github.com/Pipo93/storybook-storycreator/issues/new',
    componentImportPath: '@pipo93/react-styleguide',
    tabs: [
        {
            type: 'USAGE',
            sections: ['EXAMPLES'],
        },
    ],
    title: "Usage Examples with variantsDirection 'column'",
    sourceLink:
        'https://github.com/Pipo93/storybook-storycreator/blob/master/examples/components/Examples/docs/examples.tsx#L8',
    component: BigButton,
    headerComponentProps: {
        children: 'Button',
        type: 'black',
        onPress: (): void => alert('onPress triggered'),
    },
    componentExportName: 'BigButton',
    propsSchema,
    examples: variantsColumnExamples,
}

createStory({
    storyPath: 'Examples / Usage Tab / Examples Section',
    storyName: "variantsDirection 'column'",
    type: StoryKind.COMPONENT,
    config: variantsColumnExamplesConfig,
})

const importExampleConfig: ComponentStoryConfig<SmallButtonProps> = {
    createIssueLink: 'https://github.com/Pipo93/storybook-storycreator/issues/new',
    componentImportPath: '@pipo93/react-styleguide',
    tabs: [
        {
            type: 'USAGE',
            sections: ['IMPORT_EXAMPLE', 'DIVIDER', 'EXAMPLES'],
        },
    ],
    title: 'Import Example',
    sourceLink:
        'https://github.com/Pipo93/storybook-storycreator/blob/master/examples/components/Examples/index.stories.ts#L103',
    component: SmallButton,
    headerComponentProps: {
        children: 'Button',
        type: 'black',
        onPress: (): void => alert('onPress triggered'),
    },
    componentExportName: 'SmallButton',
    propsSchema,
    examples: [
        {
            title: 'How to create import examples',
            description:
                'Just add componentExportName and componentImportPath to your config. In addition you have to add IMPORT_EXAMPLE section to USAGE tab.',
            variants: [],
            variantsDirection: 'row',
        },
    ],
    examplesHeadline: '',
}

createStory({
    storyPath: 'Examples / Usage Tab',
    storyName: 'Import Section',
    type: StoryKind.COMPONENT,
    config: importExampleConfig,
})
