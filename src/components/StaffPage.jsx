import React from 'react';
import cheeselad from '../assets/staff/cheeselad.png';
import beans from '../assets/staff/beans.png';
import robot24 from '../assets/staff/robot24.png';
import prophet from '../assets/staff/prophet.png';
import cody from '../assets/staff/cody.png';
import duboo from '../assets/staff/duboo.png';
import wilba from '../assets/staff/wilba.png';
import papablue from '../assets/staff/papablue.png';
import senskalle from '../assets/staff/senskalle.png';
import protiska from '../assets/staff/protiska.png';
import zyper from '../assets/staff/zyper.png';
import dogeman from '../assets/staff/dogeman.png';
import camomike from '../assets/staff/camomike.png';
import v4vashek from '../assets/staff/v4vashek.png';
import prosperity from '../assets/staff/prosperity.png';
import ras from '../assets/staff/ras.png';
import floop from '../assets/staff/floop.png';
import carmanjackson from '../assets/staff/carmanjackson.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faSteam } from '@fortawesome/free-brands-svg-icons';

const staffMembers = [
  {
    name: 'CheeseLad',
    position: 'Server Owner',
    image: cheeselad,
    steam: 'https://steamcommunity.com/id/tastycheese101',
    discord: 'https://discordapp.com/users/325310653130735618'
  },
  {
    name: 'Beans',
    position: 'Server Manager',
    image: beans,
    steam: 'https://steamcommunity.com/profiles/76561198906738082',
    discord: 'https://discordapp.com/users/482619303322189834'
  },
  {
    name: 'RoBoT24',
    position: 'Head-Developer',
    image: robot24,
    steam: 'https://steamcommunity.com/id/gkdjfokskfkskds',
    discord: 'https://discordapp.com/users/1257542885058940950'
  },
  {
    name: 'Prophet',
    position: 'Head-Of-Staff',
    image: prophet,
    steam: 'https://steamcommunity.com/profiles/76561198445222957',
    discord: 'https://discordapp.com/users/446427231246614528'
  },
  {
    name: 'Cody',
    position: 'Developer',
    image: cody,
    steam: 'https://steamcommunity.com/profiles/76561199020930276',
    discord: 'https://discordapp.com/users/992376147239239721'
  },
  {
    name: 'Duboo',
    position: 'Developer',
    image: duboo,
    steam: 'https://steamcommunity.com/profiles/76561198860356692',
    discord: 'https://discordapp.com/users/760016698735722496'
  },
  {
    name: 'Wilba',
    position: 'Developer',
    image: wilba,
    steam: 'https://steamcommunity.com/profiles/76561198998009385',
    discord: 'https://discordapp.com/users/846642749381148682'
  },
  {
    name: 'Papablue',
    position: 'Admin',
    image: papablue,
    steam: 'https://steamcommunity.com/profiles/76561198312362071',
    discord: 'https://discordapp.comu/sers/366272939483725824'
  },
  {
    name: 'Senskalle',
    position: 'Moderator',
    image: senskalle,
    steam: 'https://steamcommunity.com/profiles/76561198139827957',
    discord: 'https://discordapp.com/users/771905075241025537'
  },
  {
    name: 'Protiska',
    position: 'Moderator',
    image: protiska,
    steam: 'https://steamcommunity.com/profiles/76561198364596791',
    discord: 'https://discordapp.com/users/691660874997432462'
  },
  {
    name:'Zyper',
    position: 'Moderator',
    image: zyper,
    steam: 'https://steamcommunity.com/profiles/76561198304870631',
    discord: 'https://sdiscordapp.com/users/490891823057731585'
  },
  {
    name:'Dogeman',
    position: 'Moderator',
    image: dogeman,
    steam: 'https://steamcommunity.com/profiles/76561199129610803',
    discord: 'https://discordapp.com/users/698789824047349780'
  },
  {
    name:'V4-Vashek',
    position: 'Trial-Moderator',
    image: v4vashek,
    steam: 'https://steamcommunity.com/profiles/76561199073383490',
    discord: 'https://discordapp.com/users/806594050282094632'
  },
  {
    name:'Prosperity',
    position: 'Trial-Moderator',
    image: prosperity,
    steam: 'https://steamcommunity.com/profiles/76561198153000514',
    discord: 'https://discordapp.com/users/384719758479851523'
  },
  {
    name:'Ras',
    position: 'Trial-Moderator',
    image: ras,
    steam: 'https://steamcommunity.com/profiles/76561198006678814',
    discord: 'https://discordapp.com/sers/851558930589155329'
  },
  {
    name:'Camomike',
    position: 'Trial-Moderator',
    image: camomike,
    steam: 'https://steamcommunity.com/profiles/76561199027411541',
    discord: 'https://discordapp.comu/sers/929380418988412948'
  },
  {
    name:'Floop',
    position: 'Trial-Moderator',
    image: floop,
    steam: 'https://steamcommunity.com/profiles/76561199489586912',
    discord: 'https://discordapp.comu/sers/531944803345104906'
  },
  {
    name:'Car man jackson',
    position: 'Trial-Moderator',
    image: carmanjackson,
    steam: 'https://steamcommunity.com/profiles/76561198327987391',
    discord: 'https://discordapp.com/users/335479667077283841'
  }
];

const StaffPage = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-500">Meet Our Staff</h1>
        <p className="text-xl text-gray-600">Dedicated professionals who make everything happen</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {staffMembers.map((member, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
            <p className="text-gray-500 mb-4">{member.position}</p>
            <div className="flex space-x-4">
              {member.steam && (
                <a
                  href={member.steam}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-600 hover:text-green-500"
                >
                  <FontAwesomeIcon icon={faSteam} />
                </a>
              )}
              {member.discord && (
                <a
                  href={member.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-600 hover:text-green-500"
                >
                  <FontAwesomeIcon icon={faDiscord} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffPage;