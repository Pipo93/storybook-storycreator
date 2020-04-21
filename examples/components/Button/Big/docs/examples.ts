import type { ExampleConfig } from '../../../../../src'
import { BigButtonProps } from '..'

export const examples: ExampleConfig<BigButtonProps>[] = [
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
        variantsDirection: 'column',
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
        variantsDirection: 'column',
    },
]
