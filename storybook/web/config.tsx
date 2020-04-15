import { configure, addParameters } from '@storybook/react'

import { loadStories } from '../utils/storyLoader'
import './addons'
import storySort from '../utils/storySort'

addParameters({
    options: {
        showRoots: true,
        storySort,
    },
})

// import stories
configure((): void => {
    loadStories()
}, module)
