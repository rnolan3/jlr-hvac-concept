import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../actions'

import CSSTransitionGroup from 'react-addons-css-transition-group'

import HarzardButton from '../components/hazard/HazardButton'
import DefrostGroup from '../components/defrost/DefrostGroup'
import FanControlGroup from '../components/fans/FanControlGroup'
import FanDial from '../components/fans/FanDial'

import TempSlider from '../components/temperature/TempSlider'
//import HeatedSeatButton from '../components/seat/HeatedSeatButton'

import styles from './HVAC.scss'

const HVAC = ({ airCirculation, defrost, fan, actions }) => {
  return (
    <CSSTransitionGroup
      transitionAppear
      transitionAppearTimeout={ 90000 }
      transitionEnterTimeout={ 1000 }
      transitionLeaveTimeout={ 1000 }
      transitionName="grow">
      <div className={ styles.wrapper }>
        <HarzardButton />
        <section className={ styles.tempWrapper }>
          <div className={ styles.colLeft }>
            <TempSlider defaultValue="18" direction="left" label="L" />
          </div>

          <div className={ styles.colRight }>
            <TempSlider defaultValue="21" direction="right" label="R" />
          </div>
        </section>

        <section>
          <FanControlGroup { ...{ actions, airCirculation } } />
          <FanDial { ...{ actions, fan } } />
          <DefrostGroup { ...{ actions, defrost } } />
        </section>
      </div>
    </CSSTransitionGroup>
  )
}

export default connect(
  (state) => { return state },
  (dispatch) => { return { actions: bindActionCreators(actions, dispatch) } }
)(HVAC)
