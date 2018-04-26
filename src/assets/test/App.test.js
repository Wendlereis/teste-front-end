import React from 'react'
import { configure, shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Search from '../../components/Search/Search'

configure({ adapter: new Adapter() })

test('<Search />', () => {
  it('Should render without throwing any error', () => {
    const wrapper = shallow(<Search />)

    expect(wrapper.find('.search')).to.have.length(1)
  })
})
