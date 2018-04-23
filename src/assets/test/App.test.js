import YoutubeAPI from '../../service/YoutubeAPI'

it('Call api to search videos by name', () => {
  let data = new YoutubeAPI().search('icasei').then(res => {
    return res
  })

  expect(data).toBeDefined()
})

it('Call api to search a video by its id', () => {
  let data = new YoutubeAPI().searchById('GgUSmu1yMS4').then(res => {
    return res
  })

  expect(data).toBeDefined()
})
