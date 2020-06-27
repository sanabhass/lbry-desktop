// @flow
import * as ICONS from 'constants/icons';
import fs from 'fs';
import React, { useEffect } from 'react';
import { regexInvalidURI } from 'lbry-redux';
import Button from 'component/button';
import Card from 'component/common/card';
import Spinner from 'component/spinner';
import { FormField } from 'component/common/form';
import { FF_MAX_CHARS_IN_DESCRIPTION } from 'constants/form-field';

import usePersistedState from 'effects/use-persisted-state';

type Props = {
  title: ?string,
  content: ?string,
  description: ?string,
  name: ?string,
  filePath: string | WebFile,
  isStillEditing: boolean,
  balance: number,
  updatePublishForm: ({}) => void,
  disabled: boolean,
  publishing: boolean,
  showToast: string => void,
  inProgress: boolean,
  clearPublish: () => void,
  ffmpegStatus: any,
  optimize: boolean,
  size: number,
  duration: number,
  isVid: boolean,
  setContent: string => void,
};

function PublishFile(props: Props) {
  const {
    title,
    description,
    name,
    balance,
    filePath,
    isStillEditing,
    updatePublishForm,
    disabled,
    publishing,
    inProgress,
    clearPublish,
    size,
    content,
    setContent,
  } = props;

  const [advancedEditor, setAdvancedEditor] = usePersistedState('publish-form-description-mode', false);

  function toggleMarkdown() {
    setAdvancedEditor(!advancedEditor);
  }

  function saveFileChanges() {
    // Desktop implementation
    // Todo: Lbry.tv ( web ) implementation
    if (typeof filePath === 'string') {
      fs.writeFile(filePath, content, 'utf8', (err, data) => {
        // Handle error, cant save changes or create file
        if (err) {
          return console.log(err);
        }
        // Handle success:
        // Notify user about file updated ?
        console.log(data);
      });
    }
  }

  useEffect(() => {
    // Save file changes on navigation or app quit, etc...
    function onComponentUnmount() {
      saveFileChanges();
    }
    // Test for file changes
    return onComponentUnmount;
  }, []);

  let cardTitle;
  if (publishing) {
    cardTitle = (
      <span>
        {__('Publishing')}
        <Spinner type={'small'} />
      </span>
    );
  } else {
    cardTitle = isStillEditing ? __('Edit') : __('Publish');
  }

  return (
    <Card
      icon={ICONS.STORY}
      disabled={disabled || balance === 0}
      title={
        <React.Fragment>
          {cardTitle}{' '}
          {inProgress && <Button button="close" label={__('Cancel')} icon={ICONS.REMOVE} onClick={clearPublish} />}
        </React.Fragment>
      }
      subtitle={isStillEditing ? __('You are currently editing a claim.') : __('Write a totally wacky and wild story.')}
      actions={
        <React.Fragment>
          <FormField
            type="text"
            name="content_title"
            label={__('Title')}
            placeholder={__('Titular Title')}
            disabled={disabled}
            value={title}
            onChange={e => {
              updatePublishForm({ title: e.target.value });
            }}
          />
          <FormField
            type={advancedEditor ? 'markdown' : 'textarea'}
            name="content_description"
            label={__('Description')}
            placeholder={__('My description for this and that')}
            value={content}
            disabled={disabled}
            onChange={value => {
              setContent(advancedEditor ? value : value.target.value);
            }}
            quickActionLabel={advancedEditor ? __('Simple Editor') : __('Advanced Editor')}
            quickActionHandler={toggleMarkdown}
            textAreaMaxLength={FF_MAX_CHARS_IN_DESCRIPTION}
          />
        </React.Fragment>
      }
    />
  );
}

export default PublishFile;
