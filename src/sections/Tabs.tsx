import React, { FunctionComponent, ReactElement } from 'react'
import { TabView } from '../components'
import { FlexingView } from '../basicElements'

export type Tab = {
    title: string
    content: (ReactElement | null)[]
}

export type TabType = 'USAGE' | 'API_DOCUMENTATION' | 'PLAYGROUND'

export type TabConfig = {
    type: TabType
    sections: (ReactElement | null)[]
}

type TabsProps = {
    content: Tab[]
    storyTitle: string
}

export const Tabs: FunctionComponent<TabsProps> = ({ content, storyTitle }): ReactElement => {
    return (
        <FlexingView key={`${storyTitle}_tabs`} style={{ backgroundColor: '#fff' }}>
            <TabView content={content} />
        </FlexingView>
    )
}

const tabTypeTitleMap = {
    USAGE: 'Usage',
    API_DOCUMENTATION: 'API',
    PLAYGROUND: 'Playground',
}

const getTabTitle = (type: TabType): string => {
    return tabTypeTitleMap[type]
}

export const tab = (content: TabConfig): Tab => {
    return {
        title: getTabTitle(content.type),
        content: content.sections,
    }
}
