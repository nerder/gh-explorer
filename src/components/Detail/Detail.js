import React from 'react';
import { props, skinnable, t, pure } from 'revenge';
import { ModalManager, BasicModal } from 'buildo-react-components/src/modal-manager';
import ScrollView from 'buildo-react-components/src/scroll';
import { FlexView } from 'buildo-react-components/src/flex';
import Divider from 'buildo-react-components/src/Divider';
import { getSingleRepo } from 'api';
import './detail.scss';

@skinnable()
@pure
@props({
  id: t.String,
  owner: t.String,
  repo: t.String,
  back: t.Function
})
export default class Detail extends React.Component {

  constructor(props){
    super(props);
    this.state = { result: undefined, error: undefined };
  }

  getLocals() {
    const {
      state: {
        result,
        error
      }
    } = this;
    return {
      result,
      error,
      shouldDisplayModalManger: !!(result || error),
      shouldRenderModal: !!result && !error,
      shouldRenderError: !!error
    };
  }

  getSingleRepo(owner, repo){
    getSingleRepo(owner, repo)
      .then(res => {
        this.setState({ result: res });
      })
      .catch(err => {
        this.setState({ result: undefined, error: err });
      });
  }

  componentDidMount(){
    this.getSingleRepo(this.props.owner, this.props.repo);
  }

  closeModal = () => {
    this.props.back();
  };

  getTransitionStyles() {
    return {
      enter: {
        opacity: '0.01',
        transform: 'scale(1)',
        transition: 'opacity .8s ease-in-out, transform .5s ease-out'
      },
      enterActive: {
        opacity: '1',
        transform: 'scale(1)'
      },
      default: {},
      leave: {
        opacity: '1',
        transform: 'scale(1)',
        transition: 'opacity .8s ease-in-out, transform .5s ease-out'
      },
      leaveActive: {
        transform: 'scale(0.01)',
        opacity: '0.01'
      }
    };
  }

  templateModal = (result) => (
    <BasicModal background={{ color: '#171717' }} onDismiss={this.closeModal} key={result.id}>
      <ScrollView
        className='detail'
        style={{ minWidth: 500, minHeight: 500 }}
        scrollPropagation={false}
      >
      <FlexView
        row
        width='100%'
        grow
      >
        <FlexView
          column
          grow
          vAlignContent='top'
          hAlignContent='left'
        >
          <h2><a target="_blank" href={result.html_url}>{result.name}</a></h2>
          <p>{result.description}</p>
        </FlexView>
        <Divider orientation="horizontal" size="medium" />
        <FlexView
          column
          grow
          vAlignContent='top'
          hAlignContent='center'
          style={{ maxWidth: 200 }}
        >
          <img src={result.avatar_url}/>
        </FlexView>
      </FlexView>
      <FlexView
        row
        width='100%'
        grow
      >
        <FlexView
          column
          grow
          vAlignContent='top'
          hAlignContent='left'
        >
          <h3>Infos & Stats</h3>
          <p>Language: {result.language}</p>
          <p>Stars: {result.stargazers_count}</p>
        </FlexView>
        <FlexView
          column
          grow
          vAlignContent='top'
          hAlignContent='center'
          basis='43%'
        >
          <h3>About the author</h3>
          <p>Nickname: {result.login}</p>
        </FlexView>
      </FlexView>
      </ScrollView>
    </BasicModal>
  );

  templateModalError = (error) => {
    return(
      <BasicModal background={{ color: '#171717' }} onDismiss={this.closeModal} key={error.id}>
        <ScrollView
          className='detail'
          style={{ width: 500, maxHeight: 500 }}
          scrollPropagation={false}
        >
          <div style={{ height: 1000 }}>
            <ul>id: {error.error.status}</ul>
          </div>
        </ScrollView>
      </BasicModal>
    );
  };

  template({ result, error, shouldRenderModal, shouldDisplayModalManger }) {
    return (
      shouldDisplayModalManger && (
        <ModalManager
          transitionStyles={this.getTransitionStyles()}
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}
        >
          {shouldRenderModal ? this.templateModal(result) : this.templateModalError(error)}
        </ModalManager>
      )
    );
  }
}
