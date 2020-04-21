import React, { ComponentClass, FunctionComponent, ReactElement } from 'react'
import { View } from 'react-native'
import { Text, UrlOpener } from '../basicElements'
import { ContentLayout } from '../layouts'
import { useThemeContext } from '../theming/ThemeProvider'
import OutlinedButton from '../basicElements/OutlinedButton'

export type HeaderConfig<P> = {
    sourceLink?: string
    createIssueLink?: string
    title: string
    example?: {
        component: FunctionComponent<P> | ComponentClass<P>
        componentProps: P
    }
}

type HeaderProps<P> = {
    config: HeaderConfig<P>
}

const Header = <P,>({ config }: HeaderProps<P>): ReactElement | null => {
    const { sourceLink, createIssueLink, example } = config
    const Component = example?.component

    const { theme } = useThemeContext()

    return (
        <ContentLayout
            style={{ backgroundColor: theme?.header.colors.backgroundColor, paddingVertical: 20 }}
        >
            <View
                style={{
                    flexGrow: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap',
                }}
            >
                {sourceLink ? (
                    <OutlinedButton
                        marginRight={32}
                        onPress={(): void => UrlOpener.openUrl(sourceLink)}
                    >{`</> Source`}</OutlinedButton>
                ) : null}
                {createIssueLink ? (
                    <OutlinedButton onPress={(): void => UrlOpener.openUrl(createIssueLink)}>
                        Report an issue
                    </OutlinedButton>
                ) : null}
            </View>
            <View style={{ flexGrow: 1, marginVertical: 16 }}>
                <Text
                    style={{
                        fontSize: 36,
                        fontWeight: 'bold',
                        color: theme?.header.colors.titleColor,
                    }}
                >
                    {config.title}
                </Text>
            </View>
            {config.example && Component ? (
                <View>
                    <Component {...config.example?.componentProps} />
                </View>
            ) : null}
        </ContentLayout>
    )
}

export default Header
