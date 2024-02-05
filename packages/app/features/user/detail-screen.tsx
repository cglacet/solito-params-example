import { createParam } from 'solito'
import { TextLink } from 'solito/link'

import { Pressable } from 'react-native'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { useCallback } from 'react'

const TEST_USER_ID = 'cglacet'
const { useParam } = createParam<{ id: string; 'is-news': string }>()

export function UserDetailScreen() {
  const [userId] = useParam('id')
  const [isNew, setIsNew] = useParam('is-news')

  const onUserChanged = useCallback(
    (userId: string) => {
      if (userId === TEST_USER_ID) {
        console.log('Is a new User')
        setIsNew('1')
      }
    },
    [setIsNew],
  )

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-4 text-center font-bold">{`User ID: ${userId} ${
        isNew === '1' ? ' (new)' : ''
      }`}</Text>
      <TextLink href="/">👈 Go Home</TextLink>
      <ChangeUserButton onUserChanged={onUserChanged} />
    </View>
  )
}

function ChangeUserButton(props: { onUserChanged: (userId: string) => void }) {
  const [_, setUserId] = useParam('id')

  const onPress = useCallback(() => {
    props.onUserChanged(TEST_USER_ID)
    setUserId(TEST_USER_ID)
  }, [props, setUserId])

  return (
    <Pressable onPress={onPress}>
      <Text>Change user ID to '{TEST_USER_ID}'</Text>
    </Pressable>
  )
}
