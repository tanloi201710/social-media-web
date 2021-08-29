import React from 'react';
import Avatar from 'react-avatar-edit';
import './ChangeAvatar.css'

class ChangeAvartar extends React.Component {
    
  user = JSON.parse(localStorage.getItem('profile'));
  constructor(props) {
      super(props)
      const src = '';
      this.state = {
        preview: null,
        src
      }
      this.onCrop = this.onCrop.bind(this)
      this.onClose = this.onClose.bind(this)
  }
  
  onClose() {
    this.setState({preview: null})
  }

  onCrop(preview) {
    this.setState({preview})
  }

  render () {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <div className="changeAvatar">
        <div className="changeAvatarSet">
          <Avatar
            width={400}
            height={300}
            display='flex'
            onCrop={this.onCrop}
            onClose={this.onClose}
            src={this.state.src}
          />
          <img src={this.state.preview ? this.state.preview : PF+'person/defaultUser.jpg'} className="changeAvatarImg" alt="" />
        </div>
      </div>
    )
  }
}

export default ChangeAvartar;