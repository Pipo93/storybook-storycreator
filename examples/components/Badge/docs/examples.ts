import type { ExampleConfig } from '../../../../src'
import { BadgeProps } from '..'

export const examples: ExampleConfig<BadgeProps>[] = [
    {
        title: 'Children (number)',
        variants: [
            {
                children: 1,
                type: 'black',
            },
            {
                children: 10,
                type: 'black',
            },
            {
                children: 99,
                type: 'black',
            },
            {
                children: 100,
                type: 'black',
            },
            {
                children: 1000,
                type: 'black',
            },
        ],
        variantsDirection: 'row',
    },
    {
        title: 'Type',
        description: 'black (1), red (2)',
        variants: [
            {
                children: 1,
                type: 'black',
            },

            {
                children: 2,
                type: 'red',
            },
        ],
        variantsDirection: 'row',
    },
]
