import React, { ComponentClass, FunctionComponent, ReactElement } from 'react'
import { Text } from 'react-native'
import { ContentLayout } from '../layouts'
import { ExampleConfig } from '../StoryCreator'
import { Example } from './index'

type Props<P> = {
    examples: ExampleConfig<P>[]
    component: FunctionComponent<P> | ComponentClass<P>
}

const Examples = <P,>({ examples, component }: Props<P>): ReactElement => {
    return (
        <>
            <ContentLayout style={{ marginVertical: 32 }}>
                <Text style={{ fontSize: 24 }}>Examples</Text>
            </ContentLayout>
            {examples.map(example => (
                <Example
                    key={example.title}
                    title={example.title}
                    description={example.description}
                    exampleProps={example.props}
                    component={component}
                />
            ))}
        </>
    )
}

export default Examples
