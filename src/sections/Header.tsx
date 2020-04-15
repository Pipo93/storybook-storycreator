import React, { ComponentClass, FunctionComponent, ReactElement } from 'react'
import { Text, NonFlexingView, FlexingView, UrlOpener, Touchable } from '../basicElements'
import { ContentLayout } from '../layouts'

export type HeaderConfig<P> = {
    sourceLink?: string
    createIssueLink?: string
    title: string
    example: {
        component: FunctionComponent<P> | ComponentClass<P>
        componentProps: P
    }
}

type HeaderProps<P> = {
    config: HeaderConfig<P>
}

const Header = <P,>({ config }: HeaderProps<P>): ReactElement | null => {
    const { sourceLink, createIssueLink, example } = config
    const Component = example.component

    return (
        <ContentLayout style={{ backgroundColor: '#FBFBFB', paddingVertical: 20 }}>
            <NonFlexingView style={{ flexDirection: 'row', alignItems: 'center', height: 80 }}>
                <FlexingView>
                    <Text style={{ fontSize: 36, fontWeight: 'bold' }}>{config.title}</Text>
                </FlexingView>
                <FlexingView style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {/* TODO: add component for this */}
                    {sourceLink ? (
                        <NonFlexingView style={{ marginRight: 32 }}>
                            <Touchable onPress={(): void => UrlOpener.openUrl(sourceLink)}>
                                <Text style={{ color: '#3899EC' }}>{`</> Source`}</Text>
                            </Touchable>
                        </NonFlexingView>
                    ) : null}
                    {/* TODO: add component for this */}
                    {createIssueLink ? (
                        <NonFlexingView>
                            <Touchable onPress={(): void => UrlOpener.openUrl(createIssueLink)}>
                                <Text style={{ color: '#3899EC' }}>Report an issue</Text>
                            </Touchable>
                        </NonFlexingView>
                    ) : null}
                </FlexingView>
            </NonFlexingView>
            <NonFlexingView style={{ paddingHorizontal: 20 }}>
                <Component {...config.example.componentProps} />
            </NonFlexingView>
        </ContentLayout>
    )
}

export default Header
