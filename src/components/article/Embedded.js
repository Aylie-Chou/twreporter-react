/*eslint no-unused-vars:0*/
'use strict'
import _ from 'lodash'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React from 'react' // eslint-disable-next-line
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './Embedded.scss'

export const EmbeddedCode = ({ content }) => {

  let embeddedCode = _.get(content, [ 0 ], {})

  return (
    <div className={classNames(commonStyles['inner-block'])}>
      <div dangerouslySetInnerHTML={{ __html: embeddedCode.embeddedCode }}/>
      <div className={classNames(commonStyles['desc-text-block'], 'text-justify')}>{embeddedCode.caption}</div>
    </div>
  )
}

export const AlignedEmbedded = BlockAlignmentWrapper(EmbeddedCode)
