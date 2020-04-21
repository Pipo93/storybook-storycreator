import React, { ReactElement } from 'react'
import { configure, addParameters, addDecorator } from '@storybook/react'

import { loadStories } from '../utils/storyLoader'
import './addons'
import storySort from '../utils/storySort'
import { ThemeProvider } from '../../src/theming/ThemeProvider'

addParameters({
    options: {
        showRoots: true,
        storySort,
    },
})

addDecorator(
    (story): ReactElement => {
        return <ThemeProvider>{story()}</ThemeProvider>
    }
)

// import stories
configure((): void => {
    loadStories()
}, module)
