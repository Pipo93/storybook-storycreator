import React, { Fragment, FunctionComponent, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ContentLayout } from '../layouts'
import { Tab } from '../sections/Tabs'
import { FlexingView, NonFlexingView, Text } from '../basicElements'

const TabView: FunctionComponent<{ content: Tab[] }> = ({ content }) => {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <FlexingView>
            <ContentLayout>
                <NonFlexingView style={{ flexDirection: 'row', marginVertical: 32 }}>
                    {content.map((tab, index) => {
                        const renderedSections = tab.content.filter(s => s)
                        if (!renderedSections.length) {
                            return null
                        }
                        return (
                            <Fragment key={tab.title}>
                                <NonFlexingView
                                    style={{
                                        paddingHorizontal: 16,
                                        height: 44,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderBottomWidth: index === activeTab ? 3 : 0,
                                        borderBottomColor: '#3899EC',
                                    }}
                                >
                                    <TouchableOpacity
                                        key={tab.title}
                                        onPress={(): void => setActiveTab(index)}
                                    >
                                        <Text>{tab.title}</Text>
                                    </TouchableOpacity>
                                </NonFlexingView>
                            </Fragment>
                        )
                    })}
                </NonFlexingView>
            </ContentLayout>
            <FlexingView>{content[activeTab].content}</FlexingView>
        </FlexingView>
    )
}

export default TabView
