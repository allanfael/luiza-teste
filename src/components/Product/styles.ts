import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  rate: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingHorizontal: 16,
    marginTop: 10
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    textAlign: 'left',
    paddingHorizontal: 16,
  },
  description: {
    marginTop: 6,
    textAlign: 'left',
    paddingHorizontal: 16,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 16,
  }
})