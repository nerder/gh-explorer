import React from 'react';
import { props, skinnable, t, pure } from 'revenge';
import { ModalManager, BasicModal } from 'buildo-react-components/src/modal-manager';
import ScrollView from 'buildo-react-components/src/scroll';
import { getSingleRepo } from 'api';

@skinnable()
@pure
@props({
  id: t.String,
  owner: t.String,
  repo: t.String,
  back: t.Function
})
export default class Detail extends React.Component {

  getLocals() {
    const {
      props: {
        id,
        owner,
        repo
      }
    } = this;
    return {
      id,
      owner,
      repo
    };
  }

  getSingleRepo(owner, repo){
    getSingleRepo(owner, repo)
      .then(res => {
        console.log('Detail res => ', res);
      })
      .catch(::console.error);
  }

  componentDidMount(){
    this.getSingleRepo(this.props.owner, this.props.repo);
  }

  closeModal = () => {
    this.props.back();
  };

  templateModal = (id, owner, repo) => (
    <BasicModal onDismiss={this.closeModal} key={id}>
      <ScrollView style={{ width: 300, height: 500, backgroundColor: 'yellow' }} scrollPropagation={false}>
        <div style={{ height: 1000 }}>
          <ul>id: {id}</ul>
          <ul>owner: {owner}</ul>
          <ul>repo: {repo}</ul>
        </div>
      </ScrollView>
    </BasicModal>
  );

  template({ id, owner, repo }) {
    return (
      <ModalManager>
        {this.templateModal(id, owner, repo)}
      </ModalManager>
    );
  }
}
