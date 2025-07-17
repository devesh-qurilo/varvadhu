import InboxComponent from '@/components/inbox/InboxComponent'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Inbox = () => {
  return (
    <View style={{ flex: 1 }}>
      <InboxComponent />
    </View>
  )
}

export default Inbox

const styles = StyleSheet.create({})