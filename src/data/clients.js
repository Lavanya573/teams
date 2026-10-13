// Client logos exactly as published on https://www.eteamworks.com (files under /visuals/brand-logos).
const list = [
  ['aparna', 'Aparna'], ['ramky', 'Ramky'], ['rajapushpa', 'Rajapushpa Properties'], ['credai', 'CREDAI'],
  ['suchirindia', 'Suchirindia'], ['gvk', 'GVK'], ['sbi', 'SBI'], ['tata', 'TATA'], ['videocon', 'Videocon'],
  ['airtel', 'Airtel'], ['microsoft', 'Microsoft'], ['nsl-group', 'NSL Group'], ['nabard', 'NABARD'],
  ['mnr', 'MNR'], ['tech-mahindra', 'Tech Mahindra'], ['coromandel', 'Coromandel'], ['bambino', 'Bambino'],
  ['big-c', 'Big C'], ['adp', 'ADP'], ['apollo-hospitals', 'Apollo Hospitals'], ['dr-reddys', "Dr. Reddy's"],
  ['mahidhara', 'Mahidhara Projects'], ['johnson-johnson', 'Johnson & Johnson'], ['iclean-takasago', 'iClean Takasago'],
  ['maruthi', 'Maruthi'], ['annie-besant', "Annie Besant Women's College"], ['corteva', 'Corteva'],
]
export const clients = list.map(([file, name]) => ({ name, file: `brand-logos/${file}.png` }))
