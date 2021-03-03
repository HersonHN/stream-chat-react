import React from 'react';
import { MML as MMLReact } from 'mml-react';

import { useChatContext } from '../../context/ChatContext';

import type { UnknownType } from '../../../types/types';

export type MMLProps = {
  /** mml source string */
  source: string;
  /** submit handler for mml actions */
  actionHandler?: (data: Record<string, UnknownType>) => void;
  /** align mml components to left/right and default is right */
  align?: 'left' | 'right';
};

/**
 * MML - A wrapper component around MML-React library
 */
export const MML: React.FC<MMLProps> = (props) => {
  const { actionHandler, align = 'right', source } = props;

  const { theme } = useChatContext();

  if (!source) return null;

  return (
    <MMLReact
      className={`mml-align-${align}`}
      Loading={null}
      onSubmit={actionHandler}
      source={source}
      Success={null}
      theme={(theme || '').replace(' ', '-')}
    />
  );
};
