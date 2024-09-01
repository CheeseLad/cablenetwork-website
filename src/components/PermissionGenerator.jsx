import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

const PermissionGenerator = () => {
  const [name, setName] = useState('');
  const [prefix, setPrefix] = useState('');
  const [color, setColor] = useState('');
  const [items, setItems] = useState('');
  const [vehicles, setVehicles] = useState('');
  const [groups, setGroups] = useState('');
  const [xml, setXml] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateXML();
  }, [name, prefix, color, items, vehicles, groups]);

  const generateXML = () => {
    const itemsArray = items.split(',').map(v => v.trim()).filter(Boolean);
    const vehiclesArray = vehicles.split(',').map(v => v.trim()).filter(Boolean);
    const groupsArray = groups.split(',').map(g => g.trim()).filter(Boolean);

    let xmlContent = `<Groups>\n`;

    if (name.length > 0) {
      xmlContent += `  <Id>${name.toLocaleLowerCase()}bypass</Id>\n`;
      xmlContent += `  <DisplayName>${name} Bypass</DisplayName>\n`;
    }

    if (prefix.length > 0) {
      xmlContent += `  <Prefix>${prefix} </Prefix>\n`;
    }

    if (color.length > 0) {
      xmlContent += `  <Color>${color}</Color>\n`;
    }
  
    if (groupsArray.length > 0) {
      xmlContent += '  <Members>\n';
      groupsArray.forEach(group => {
        xmlContent += `    <Member>${group}</Member>\n`;
      });
      xmlContent += '  </Members>\n';
    }

    xmlContent += '  <Permissions>\n';

    if (itemsArray.length > 0) {
      
      itemsArray.forEach(variable => {
        xmlContent += `    <Permission Cooldown="0">bypass.${variable}</Permission>\n`;
      });
      
    }

    if (vehiclesArray.length > 0) {

      vehiclesArray.forEach(variable => {
        xmlContent += `    <Permission Cooldown="0">vehiclebypass.${variable}</Permission>\n`;
      });
    }

    xmlContent += '  </Permissions>\n';

    xmlContent += '</Group>';
    setXml(xmlContent);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xml).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative pb-10 pt-20 overflow-hidden bg-gradient-to-r from-green-400 to-green-500">
      <div className="flex justify-center items-center h-full relative z-10">
        <div className="flex flex-col w-full max-w-6xl px-4 py-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Permission Generator</h1>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Permission Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prefix">
                Prefix
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="prefix"
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="[My Group]"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                Color
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="color"
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#40FFB7"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groups">
                Steam64IDs (comma-separated)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="groups"
                type="text"
                value={groups}
                onChange={(e) => setGroups(e.target.value)}
                placeholder="76561199145685535, 76561198906738082"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="items">
              Items IDs (comma-separated)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="items"
              type="text"
              value={items}
              onChange={(e) => setItems(e.target.value)}
              placeholder="13845, 13192"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicles">
              Vehicles IDs (comma-separated)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="vehicles"
              type="text"
              value={vehicles}
              onChange={(e) => setVehicles(e.target.value)}
              placeholder="13845, 13192"
            />
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Generated XML:</h2>
            <div className="relative">
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                {xml}
              </pre>
              <button
                className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={copyToClipboard}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionGenerator;