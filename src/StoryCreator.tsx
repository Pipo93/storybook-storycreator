import React, { ComponentClass, FunctionComponent, ReactElement } from 'react'
import { ScrollView, View } from 'react-native'
import Markdown from '@pipo93/react-native-markdown'
import { GetImageParams } from '@pipo93/react-native-markdown/lib/types'
import { HeaderConfig } from './sections/Header'
import { createTab, Tabs, Divider, ImportExample, Header } from './sections'
import { TabType } from './sections/Tabs'
import PropsAPI, { PropsObject } from './sections/PropsAPI'
import Examples from './sections/Examples'
import storiesOf from './utils/storiesOf'

type StoryConfig = {
    title: string
    sections: (ReactElement | null)[]
}

type Section = 'HEADER' | 'IMPORT_EXAMPLE' | 'DIVIDER' | 'PROPS_API' | 'EXAMPLES'

type BasicTabConfig = {
    type: TabType
    sections: Section[]
}

export type ExampleConfig<P> = {
    title: string
    description?: string
    props: P | P[]
}

export type BasicComponentStoryConfig<P> = {
    sourceLink?: string
    createIssueLink?: string
    componentImportPath: string
    title: string
    propsSchema?: PropsObject
    component: FunctionComponent<P> | ComponentClass<P>
    componentProps: P
    componentPath: string
    componentExportName: string
    tabs: BasicTabConfig[]
    examples?: ExampleConfig<P>[]
}

const createStoryConfig = <P,>({
    componentImportPath,
    title,
    sourceLink,
    component,
    componentProps,
    componentExportName,
    tabs,
    propsSchema,
    examples,
    createIssueLink,
}: BasicComponentStoryConfig<P>): StoryConfig => {
    const headerConfig: HeaderConfig<P> = {
        sourceLink,
        createIssueLink,
        title,
        example: {
            component,
            componentProps,
        },
    }

    const storyTabs = tabs.map(t => {
        const tabSections = t.sections.map((s, i) => {
            if (s === 'IMPORT_EXAMPLE') {
                return (
                    <ImportExample
                        key={i}
                        componentExportName={componentExportName}
                        componentImportPath={componentImportPath}
                    />
                )
            }

            if (s === 'DIVIDER') {
                return <Divider key={i} />
            }

            if (s === 'PROPS_API' && propsSchema) {
                return <PropsAPI key={i} schema={propsSchema} />
            }

            if (s === 'EXAMPLES' && examples) {
                return <Examples key={i} examples={examples} component={component} />
            }

            return null
        })

        return createTab({
            type: t.type,
            sections: tabSections,
        })
    })

    return {
        title,
        sections: [
            <Header key={`${title}_header`} config={headerConfig} />,
            <Divider key={`${title}_header_divider`} />,
            <Tabs key={`${title}_tabs`} content={storyTabs} storyTitle={title} />,
        ],
    }
}

const getStoryName = (type: StoryTypes): string => {
    if (type === 'COMPONENT') {
        return 'V2 Stories / Components'
    }

    return 'Others / Unknown'
}

type StoryTypes = 'COMPONENT'

type ComponentStory<P> = {
    type: 'COMPONENT'
    config: BasicComponentStoryConfig<P>
}

type StoryType<P> = ComponentStory<P>

export const createStory = <P,>({ type, config }: StoryType<P>): void => {
    const storyConfig = createStoryConfig(config)

    storiesOf(getStoryName(type), module).add(
        storyConfig.title,
        (): ReactElement => (
            <ScrollView style={{ backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                {storyConfig.sections}
            </ScrollView>
        )
    )
}

export type MarkdownConfig = {
    storyPath: string
    storyName: string
    mdContent: string
    getImageParams?: GetImageParams
}
type CreateMarkdownStory = (config: MarkdownConfig) => void

export const createMarkdownStory: CreateMarkdownStory = ({
    storyPath,
    storyName,
    mdContent,
    getImageParams,
}) => {
    storiesOf(storyPath, module).add(
        storyName,
        (): ReactElement => (
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', paddingBottom: 32 }}>
                <View style={{ width: '10%' }} />
                <View style={{ flex: 1 }}>
                    <ScrollView
                        style={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Markdown getImageParams={getImageParams}>{mdContent}</Markdown>
                    </ScrollView>
                </View>
                <View style={{ width: '10%', flexShrink: 0 }} />
            </View>
        )
    )
}
