import type { ExampleConfig } from '../../../../../src'
import { SmallButtonProps } from '..'

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
]
