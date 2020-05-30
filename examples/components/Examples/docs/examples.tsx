import type { ExampleConfig } from '../../../../src'
import { SmallButtonProps } from '../../Button/Small'
import { BigButtonProps } from '../../Button/Big'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const backgroundRed = require('../../../../assets/storyBackgrounds/checkerboard_tile_red.png')

export const variantsColumnExamples: ExampleConfig<BigButtonProps>[] = [
    {
        title: "With variantsDirection 'column'",
        description: 'With different button types ordered in column',
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
        variantsDirection: 'column',
    },
]

export const variantsRowExamples: ExampleConfig<SmallButtonProps>[] = [
    {
        title: "With variantsDirection 'row'",
        description: 'With different button types ordered in row',
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
]

export const customBackgroundExamples: ExampleConfig<SmallButtonProps>[] = [
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
