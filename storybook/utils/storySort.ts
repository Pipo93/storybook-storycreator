type StoryContext = {
    id: string
    name: string
    kind: string
}

const storySort = (a: StoryContext[], b: StoryContext[]): number => {
    return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: false })
}

export default storySort
