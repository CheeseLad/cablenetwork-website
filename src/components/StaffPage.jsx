import React from 'react';
import cheeselad from '..assetsstaffcheeselad.png';
import beans from '..assetsstaffbeans.png';
import robot24 from '..assetsstaffrobot24.png';
import prophet from '..assetsstaffprophet.png';
import cheeselad from '..assetsstaffcody.png';
import cheeselad from '..assetsstaffduboo.png';
import cheeselad from '..assetsstaffwilba.png';
import cheeselad from '..assetsstaffPapablue.png';
import cheeselad from '..assetsstaffsenskalle.png';
import cheeselad from '..assetsstaffprotiska.png';
import cheeselad from '..assetsstaffzyper.png';
import cheeselad from '..assetsstaffdogeman.png';
import cheeselad from '..assetsstaffdogeman.png';
import cheeselad from '..assetsstaffv4-vashek.png';
import cheeselad from '..assetsstaffprosperity.png';
import cheeselad from '..assetsstaffras.png';
import cheeselad from '..assetsstafffloop.png';
import cheeselad from '..assetsstaffcarmanjackson.png';
import { FontAwesomeIcon } from '@fortawesomereact-fontawesome';
import { faDiscord, faSteam } from '@fortawesomefree-brands-svg-icons';

const staffMembers = [
  {
    name 'CheeseLad',
    position 'Server Owner',
    image cheeselad,
    steam 'httpssteamcommunity.comidtastycheese101',
    discord 'httpsdiscordapp.comusers325310653130735618'
  },
  {
    name 'Beans',
    position 'Server Manager',
    image beans,
    steam 'httpssteamcommunity.comprofiles76561198906738082',
    discord 'httpsdiscordapp.comusers482619303322189834'
  },
  {
    name 'RoBoT24',
    position 'Head-Developer',
    image robot24,
    steam 'httpssteamcommunity.comidgkdjfokskfkskds',
    discord 'httpsdiscordapp.comusers1257542885058940950'
  },
  {
    name 'Prophet',
    position 'Head-Of-Staff',
    image prophet,
    steam 'httpssteamcommunity.comprofiles76561198445222957',
    discord 'httpsdiscordapp.comusers446427231246614528'
  },
  {
    name 'Cody',
    position 'Developer',
    image cody,
    steam 'httpssteamcommunity.comprofiles76561199020930276',
    discord 'httpsdiscordapp.comusers992376147239239721'
  },
  {
    name 'Duboo',
    position 'Developer',
    image duboo,
    steam 'httpssteamcommunity.comprofiles76561198860356692',
    discord 'httpsdiscordapp.comusers760016698735722496'
  },
  {
    name 'Wilba',
    position 'Developer',
    image Wilba,
    steam 'httpssteamcommunity.comprofiles76561198998009385',
    discord 'httpsdiscordapp.comusers846642749381148682'
  },
  {
    name 'Papablue',
    position 'Admin',
    image Papablue,
    steam 'httpssteamcommunity.comprofiles76561198312362071',
    discord 'httpsdiscordapp.comusers366272939483725824'
  },
  {
    name 'Senskalle',
    position 'Moderator',
    image senskalle,
    steam 'httpssteamcommunity.comprofiles76561198139827957',
    discord 'httpsdiscordapp.comusers771905075241025537'
  },
  {
    name 'Protiska',
    position 'Moderator',
    image protiska,
    steam 'httpssteamcommunity.comprofiles76561198364596791',
    discord 'httpsdiscordapp.comusers691660874997432462'
  },
  {
    name 'Zyper',
    position 'Moderator',
    image Zyper,
    steam 'httpssteamcommunity.comprofiles76561198304870631',
    discord 'httpsdiscordapp.comusers490891823057731585'
  },
  {
    name 'Dogeman',
    position 'Moderator',
    image dogeman,
    steam 'httpssteamcommunity.comprofiles76561199129610803',
    discord 'httpsdiscordapp.comusers698789824047349780'
  },
  {
    name 'V4-Vashek',
    position 'Trial-Moderator',
    image V4-Vashek,
    steam 'httpssteamcommunity.comprofiles76561199073383490',
    discord 'httpsdiscordapp.comusers806594050282094632'
  },
  {
    name 'Prosperity',
    position 'Trial-Moderator',
    image prosperity,
    steam 'httpssteamcommunity.comprofiles76561198153000514',
    discord 'httpsdiscordapp.comusers384719758479851523'
  },
  {
    name 'Ras',
    position 'Trial-Moderator',
    image Ras,
    steam 'httpssteamcommunity.comprofiles76561198006678814',
    discord 'httpsdiscordapp.comusers851558930589155329'
  },
  {
    name 'Camomike',
    position 'Trial-Moderator',
    image Camomike,
    steam 'httpssteamcommunity.comprofiles76561199027411541',
    discord 'httpsdiscordapp.comusers929380418988412948'
  },
  {
    name 'Floop',
    position 'Trial-Moderator',
    image floop,
    steam 'httpssteamcommunity.comprofiles76561199489586912',
    discord 'httpsdiscordapp.comusers531944803345104906'
  },
  {
    name 'Car man jackson',
    position 'Trial-Moderator',
    image carmanjackson,
    steam 'httpssteamcommunity.comprofiles76561198327987391',
    discord 'httpsdiscordapp.comusers335479667077283841'
  }
];

const StaffPage = () = {
  return (
    div className=bg-gray-100 p-8
      div className=text-center mb-12
        h1 className=text-4xl font-bold text-green-500Meet Our Staffh1
        p className=text-xl text-gray-600Dedicated professionals who make everything happenp
      div

      div className=grid grid-cols-1 smgrid-cols-2 mdgrid-cols-3 lggrid-cols-4 gap-8
        {staffMembers.map((member, index) = (
          div key={index} className=bg-white p-6 rounded-lg shadow-lg flex flex-col items-center
            img
              src={member.image}
              alt={member.name}
              className=w-32 h-32 rounded-full object-cover mb-4
            
            h3 className=text-xl font-semibold mb-1{member.name}h3
            p className=text-gray-500 mb-4{member.position}p
            div className=flex space-x-4
              {member.steam && (
                a
                  href={member.steam}
                  target=_blank
                  rel=noopener noreferrer
                  className=text-3xl text-gray-600 hovertext-green-500
                
                  FontAwesomeIcon icon={faSteam} 
                a
              )}
              {member.discord && (
                a
                  href={member.discord}
                  target=_blank
                  rel=noopener noreferrer
                  className=text-3xl text-gray-600 hovertext-green-500
                
                  FontAwesomeIcon icon={faDiscord} 
                a
              )}
            div
          div
        ))}
      div
    div
  );
};

export default StaffPage;
