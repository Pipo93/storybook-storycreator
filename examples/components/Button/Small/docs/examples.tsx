import type { ExampleConfig } from '../../../../../src'
import { SmallButtonProps } from '..'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const backgroundRed = require('../../../../../assets/storyBackgrounds/checkerboard_tile_red.png')

export const examples: ExampleConfig<SmallButtonProps>[] = [
    {
        title: 'Type',
        description: 'With different background colors',
        variants: [
            {
                children: 'Black',
                type: 'black',
            },
            {
                children: 'White',
                type: 'white',
            },
            {
                children: 'Red',
                type: 'red',
            },
            {
                children: 'Green',
                type: 'green',
            },
        ],
        variantsDirection: 'row',
    },
    {
        title: 'With onPress',
        description: 'Alert should be fired when button is pressed.',
        variants: [
            {
                children: 'Trigger Alert',
                type: 'black',
                onPress: (): void => alert('Button pressed'),
            },
        ],
        variantsDirection: 'row',
    },
    {
        title: 'Custom checkerboard background image',
        description: 'Examples could be used with custom background image',
        variants: [
            {
                children: 'Small Button',
                type: 'black',
            },
        ],
        variantsDirection: 'column',
        variantsBackground: { type: 'IMAGE', src: backgroundRed },
    },
    {
        title: 'Custom background color',
        description: 'Examples could be used with custom background color',
        variants: [
            {
                children: 'Small Button',
                type: 'white',
            },
        ],
        variantsDirection: 'column',
        variantsBackground: { type: 'COLOR', color: 'blue' },
    },
]
