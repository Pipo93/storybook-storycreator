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
import Playground from './sections/Playground'

type StorySections = (ReactElement | null)[]

type PlaygroundSection<P> = {
    type: 'PLAYGROUND'
    initialProps: P
    callbackPropPrinted?: { [key: string]: string }
}

type Section<P> =
    | 'HEADER'
    | 'IMPORT_EXAMPLE'
    | 'DIVIDER'
    | 'PROPS_API'
    | 'EXAMPLES'
    | PlaygroundSection<P>

type BasicTabConfig<P> = {
    type: TabType
    sections: Section<P>[]
}

export type VariantsBackground =
    | { type: 'IMAGE'; src: string | number }
    | { type: 'COLOR'; color: string }

export type ExampleConfig<P> = {
    title: string
    description?: string
    variantsDirection: 'column' | 'row'
    variantsBackground?: VariantsBackground
    variants: P[]
}

export enum StoryKind {
    MARKDOWN = 'MARKDOWN',
    COMPONENT = 'COMPONENT',
}

type BasicStoryConfig = {
    storyPath: string
    storyName: string
    type: StoryKind
}

export type ComponentStoryConfig<P> = {
    sourceLink?: string
    createIssueLink?: string
    title: string
    component: FunctionComponent<P> | ComponentClass<P>
    headerComponentProps?: P
    componentImportPath: string
    componentExportName: string
    propsSchema?: PropsObject
    tabs: BasicTabConfig<P>[]
    examples?: ExampleConfig<P>[]
    examplesHeadline?: string
}

type ComponentStory<P> = BasicStoryConfig & {
    type: StoryKind.COMPONENT
    config: ComponentStoryConfig<P>
}

export type MarkdownStoryConfig = {
    mdContent: string
    getImageParams?: GetImageParams
}

type MarkdownStory = BasicStoryConfig & {
    type: StoryKind.MARKDOWN
    config: MarkdownStoryConfig
}

type StoryType<P> = MarkdownStory | ComponentStory<P>

const createStorySections = <P,>({
    componentImportPath,
    title,
    sourceLink,
    component,
    headerComponentProps,
    componentExportName,
    tabs,
    propsSchema,
    examples,
    createIssueLink,
    examplesHeadline,
}: ComponentStoryConfig<P>): StorySections => {
    const headerConfig: HeaderConfig<P> = {
        sourceLink,
        createIssueLink,
        title,
        example: headerComponentProps
            ? {
                  component,
                  componentProps: headerComponentProps,
              }
            : undefined,
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
                return (
                    <Examples
                        key={i}
                        examples={examples}
                        headline={examplesHeadline}
                        component={component}
                    />
                )
            }

            if (typeof s !== 'string' && s.type === 'PLAYGROUND' && propsSchema) {
                return (
                    <Playground
                        Component={component}
                        initialProps={s.initialProps}
                        callbackPropPrinted={s.callbackPropPrinted}
                        schema={propsSchema}
                        componentName={componentExportName}
                    />
                )
            }

            return null
        })

        return createTab({
            type: t.type,
            sections: tabSections,
        })
    })

    return [
        <Header key={`${title}_header`} config={headerConfig} />,
        <Divider key={`${title}_header_divider`} />,
        <Tabs key={`${title}_tabs`} content={storyTabs} storyTitle={title} />,
    ]
}

const getStory = (storyPath: string, storyName: string, storyContent: ReactElement): void => {
    storiesOf(storyPath, module).add(storyName, (): ReactElement => storyContent)
}

export const createStory = <P,>(storyConfig: StoryType<P>): void => {
    const { storyPath, storyName } = storyConfig
    let component = <></>
    if (storyConfig.type === StoryKind.MARKDOWN) {
        const { mdContent, getImageParams } = storyConfig.config
        component = <MarkdownStoryComponent mdContent={mdContent} getImageParams={getImageParams} />
    } else if (storyConfig.type === StoryKind.COMPONENT) {
        component = (
            <ScrollView style={{ backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                {createStorySections(storyConfig.config)}
            </ScrollView>
        )
    }

    getStory(storyPath, storyName, component)
}

type MarkdownStoryProps = {
    mdContent: string
    getImageParams?: GetImageParams
}

const MarkdownStoryComponent: FunctionComponent<MarkdownStoryProps> = ({
    mdContent,
    getImageParams,
}): ReactElement => {
    return (
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
}
