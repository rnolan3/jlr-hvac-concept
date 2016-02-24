import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../actions'

import CSSTransitionGroup from 'react-addons-css-transition-group'

import HarzardButton from '../components/hazard/HazardButton'
import DefrostGroup from '../components/defrost/DefrostGroup'
import FanControlGroup from '../components/fans/FanControlGroup'
import FanDial from '../components/fans/FanDial'
import FanBootLine from '../components/misc/FanBootLine'

import TempSlider from '../components/temperature/TempSlider'
//import HeatedSeatButton from '../components/seat/HeatedSeatButton'

import styles from './HVAC.scss'

const HVAC = ({ bootSequence, airCirculation, defrost, fan, temperature, actions }) => {
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
            <TempSlider
              direction="left"
              label="L"
              onChange={ actions.setTargetTemperatureLeft }
              value={ temperature.targetLeft } />
          </div>

          <div className={ styles.colRight }>
            <TempSlider
              direction="right"
              label="R"
              onChange={ actions.setTargetTemperatureRight }
              value={ temperature.targetRight } />
          </div>
        </section>

        <section className={ styles.fanGroup }>
          <FanBootLine bootStage={ bootSequence.stage } onComplete={ actions.advanceBootSequence } />
          <FanControlGroup { ...{ actions, airCirculation, bootSequence } } />
          <FanDial { ...{ actions, bootSequence, fan } } />
          <DefrostGroup { ...{ actions, defrost, bootSequence } } />
        </section>
      </div>
    </CSSTransitionGroup>
  )
}

export default connect(
  (state) => { return state },
  (dispatch) => { return { actions: bindActionCreators(actions, dispatch) } }
)(HVAC)
