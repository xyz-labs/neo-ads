import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Neon, { u } from '@cityofzion/neon-js';
import { connect } from 'react-redux';
import CookieTrail from '../../components/CookieTrail/CookieTrail'
import './Tags.css';

export class Tags extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cookieItems: []
    }
  }

  componentWillMount() {
    const { name } = this.props.match.params

    this.setState({
      cookieItems: [
        {
          name: 'Account',
          link: '/account'
        },
        {
          name: name,
          link: `/publications/tags/${name}`
        },
      ]
    })
  }

  render() {
    const { addressHash, match } = this.props
    const name = u.str2hexstring(match.params.name)
    const networkName = process.env.REACT_APP_NETWORK_NAME
    const neoscanAddr = process.env.REACT_APP_NEOSCAN_ADDRESS
    const seedAddr = process.env.REACT_APP_SEED_ADDRESS
    const scriptHash = process.env.REACT_APP_SCRIPT_HASH

    return (
      <div class="content">
        <div class="content-body">
          <div class="general-header-2 w-clearfix">
            <div>
              <h2 class="h2">Website ad tags</h2>
            </div>
            <CookieTrail
              items={this.state.cookieItems}
              />
          </div>
          <div class="div-block-4 code1">
            <div class="t1"><strong>Interaction Script</strong></div>
            <div class="div-block-13">
              <div class="t9 code">
              {`<script src="https://cdn.jsdelivr.net/npm/@cityofzion/neon-js@3.10.1/lib/browser.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/core.js" integrity="sha256-YCbKJH6u4siPpUlk130udu/JepdKVpXjdEyzje+z1pE=" crossorigin="anonymous"></script>
                <script>
                jQuery(document).ready(function ($) {
                  var network = new Neon.rpc.Network({name: '${networkName}', extra: { neoscan: '${neoscanAddr}'}}); 
                  Neon.default.add.network(network); 
                  var script = Neon.default.create.script({scriptHash: '${scriptHash}', operation: 'getCurrentWinner', args: ['${addressHash}', '${name}']});
                  Neon.rpc.Query.invokeScript(script).execute('${seedAddr}').
                  then((res) => {
                    var result = res.result.stack[0];
                    if (result.value[0].value != 1 || result.value[1].value.length < 5) return;
                    var adUrl = Neon.u.hexstring2str(result.value[1].value[2].value);
                    var imgUrls = Neon.u.hexstring2str(result.value[1].value[3].value);
                    $('.na-div').attr('href', adUrl);
                    imgUrls.split(',').forEach((url, idx) => {
                      $(\`.na-img\${idx}\`).attr('src', url);
                    });
                  });
                });</script>`}
            </div>
            </div>
            <div class="t9 tag">Add script to the top of global &lt;head&gt;</div>
          </div>
          <div class="div-block-4 code1">
            <div class="t1 tag2"><strong>Ad Space Tags</strong></div>
            <div class="div-block-13">
              <div class="t9 code">&lt;a id=&quot;na-div1&quot; href=&quot;#&quot;&gt;{"\n"}  &lt;img id=&quot;na-img1&quot; style=&quot;width:728px;height:90px;&quot; src=&quot;#&quot;&gt;{"\n"}&lt;/a&gt;</div>
            </div>
            <div class="t9 tag">Leaderboard: 728px x 90px</div>
          </div>
          <div class="div-block-4 code1">
            <div class="div-block-13">
              <div class="t9 code">&lt;a id=&quot;na-div1&quot; href=&quot;#&quot;&gt;{"\n"}  &lt;img id=&quot;na-img1&quot; style=&quot;width:728px;height:90px;&quot; src=&quot;#&quot;&gt;{"\n"}&lt;/a&gt;</div>
            </div>
            <div class="t9 tag">Medium Rectangle (M-REC): 300px x 250px</div>
          </div>
        </div>
      </div>
    );
  }
}

Tags.propTypes = {
  address: PropTypes.string,
  match: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    address: state.getIn(['neolink', 'address']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
