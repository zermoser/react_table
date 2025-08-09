import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type ColumnFiltersState,
  type Column,
  type VisibilityState,
  type Table,
} from '@tanstack/react-table';
import { Search, X, Columns, Check, Plus, Minus, LayoutGrid, User, Mail, Phone, Copy, Menu, Sun, Moon, Disc, Gamepad2 } from 'lucide-react';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    displayName?: string;
    filterType?: 'text' | 'select';
    filterOptions?: string[];
  }
}

export interface GameDevelopmentDto {
  game_id: number;
  game_name: string;
  expansion_id: number;
  expansion_name: string;
  genre_id: number;
  genre_name: string;
  description: string;
  platforms: string;
  game_director: string;
  director_email: string;
  director_phone: string;
  publisher1: string;
  publisher2: string;
  publisher3: string;
  publisher4: string;
  lead_designer: string;
  dev_team: string;
  developer1: string;
  developer2: string;
  developer3: string;
  developer4: string;
  online_features: string;
  security_features: string;
  live_support: string;

  // UI fields
  groupColor?: string;
  isFirstInGroup?: boolean;
}

const mockData: GameDevelopmentDto[] = [
  {
    game_id: 1,
    game_name: 'Fortress Conquest',
    expansion_id: 1,
    expansion_name: 'Base Game',
    genre_id: 1,
    genre_name: 'Strategy',
    description: 'Build your fortress and conquer the world',
    platforms: 'PC, Console',
    game_director: 'John.Doe',
    director_email: 'john.doe@gamedev.co.th',
    director_phone: '021234567',
    publisher1: 'GamePublish Inc.',
    publisher2: '',
    publisher3: '',
    publisher4: '',
    lead_designer: 'Jane.Smith',
    dev_team: 'Game Design',
    developer1: 'Mike.Johnson',
    developer2: 'Sarah.Williams',
    developer3: '',
    developer4: '',
    online_features: 'Multiplayer, Cloud Saves',
    security_features: '2FA Enabled',
    live_support: '24/7'
  },
  {
    game_id: 2,
    game_name: 'Cyber Nexus',
    expansion_id: 2,
    expansion_name: 'Neon Expansion',
    genre_id: 2,
    genre_name: 'RPG',
    description: 'Futuristic cyberpunk adventure',
    platforms: 'PC',
    game_director: 'Alex.Chen',
    director_email: 'alex.chen@gamedev.co.th',
    director_phone: '023456789',
    publisher1: 'Future Games',
    publisher2: '',
    publisher3: '',
    publisher4: '',
    lead_designer: 'Robert.Kim',
    dev_team: 'RPG Division',
    developer1: 'Emily.Wong',
    developer2: 'David.Lee',
    developer3: '',
    developer4: '',
    online_features: 'Co-op, Leaderboards',
    security_features: 'Encrypted Saves',
    live_support: 'Business Hours'
  },
  {
    game_id: 2,
    game_name: 'Cyber Nexus',
    expansion_id: 3,
    expansion_name: 'Matrix Update',
    genre_id: 2,
    genre_name: 'RPG',
    description: 'New matrix simulation system',
    platforms: 'PC',
    game_director: 'Alex.Chen',
    director_email: 'alex.chen@gamedev.co.th',
    director_phone: '023456789',
    publisher1: 'Future Games',
    publisher2: '',
    publisher3: '',
    publisher4: '',
    lead_designer: 'Robert.Kim',
    dev_team: 'RPG Division',
    developer1: 'Emily.Wong',
    developer2: 'David.Lee',
    developer3: '',
    developer4: '',
    online_features: 'Co-op, Leaderboards',
    security_features: 'Encrypted Saves',
    live_support: 'Business Hours'
  },
  {
    game_id: 3,
    game_name: 'Galaxy Explorers',
    expansion_id: 4,
    expansion_name: 'Cosmic Update',
    genre_id: 3,
    genre_name: 'Adventure',
    description: 'Explore distant galaxies and alien worlds',
    platforms: 'PC, Console, Mobile',
    game_director: 'Sam.Wilson',
    director_email: 'sam.wilson@gamedev.co.th',
    director_phone: '024567890',
    publisher1: 'Space Games Co.',
    publisher2: '',
    publisher3: '',
    publisher4: '',
    lead_designer: 'Lisa.Taylor',
    dev_team: 'Space Dev',
    developer1: 'Tom.Brown',
    developer2: '',
    developer3: '',
    developer4: '',
    online_features: 'Multiplayer, Trading',
    security_features: 'Parental Controls',
    live_support: '24/7'
  },
  {
    game_id: 4,
    game_name: 'Shadow Realms',
    expansion_id: 5,
    expansion_name: 'Darkness Rises',
    genre_id: 4,
    genre_name: 'Horror',
    description: 'Survival horror in supernatural worlds',
    platforms: 'PC, Console',
    game_director: 'Chris.Evans',
    director_email: 'chris.evans@gamedev.co.th',
    director_phone: '025678901',
    publisher1: 'Dark Arts Studio',
    publisher2: '',
    publisher3: '',
    publisher4: '',
    lead_designer: 'Megan.Clark',
    dev_team: 'Horror Division',
    developer1: 'James.Miller',
    developer2: 'Olivia.White',
    developer3: '',
    developer4: '',
    online_features: 'Co-op Survival',
    security_features: 'Content Warnings',
    live_support: 'Evenings Only'
  },
  {
    game_id: 5,
    game_name: 'Racing Revolution',
    expansion_id: 6,
    expansion_name: 'Turbo Pack',
    genre_id: 5,
    genre_name: 'Racing',
    description: 'High-speed racing with realistic physics',
    platforms: 'Console',
    game_director: 'Peter.Parker',
    director_email: 'peter.parker@gamedev.co.th',
    director_phone: '026789012',
    publisher1: 'Speed Games',
    publisher2: '',
    publisher3: '',
    publisher4: '',
    lead_designer: 'Tony.Stark',
    dev_team: 'Racing Team',
    developer1: 'Steve.Rogers',
    developer2: '',
    developer3: '',
    developer4: '',
    online_features: 'Multiplayer Races',
    security_features: 'Anti-Cheat',
    live_support: 'Weekends'
  },
  {
    game_id: 6,
    game_name: 'Fantasy Kingdoms',
    expansion_id: 7,
    expansion_name: 'Dragon Expansion',
    genre_id: 6,
    genre_name: 'Fantasy',
    description: 'Epic fantasy with dragons and magic',
    platforms: 'PC, Console, Mobile',
    game_director: 'Bruce.Wayne',
    director_email: 'bruce.wayne@gamedev.co.th',
    director_phone: '027890123',
    publisher1: 'Magic Studios',
    publisher2: '',
    publisher3: '',
    publisher4: '',
    lead_designer: 'Diana.Prince',
    dev_team: 'Fantasy Dev',
    developer1: 'Clark.Kent',
    developer2: '',
    developer3: '',
    developer4: '',
    online_features: 'Guilds, Trading',
    security_features: 'Account Protection',
    live_support: '24/7'
  },
  {
    game_id: 6,
    game_name: 'Fantasy Kingdoms',
    expansion_id: 8,
    expansion_name: 'Elven Realms',
    genre_id: 6,
    genre_name: 'Fantasy',
    description: 'New elven territories and quests',
    platforms: 'PC, Console, Mobile',
    game_director: 'Bruce.Wayne',
    director_email: 'bruce.wayne@gamedev.co.th',
    director_phone: '027890123',
    publisher1: 'Magic Studios',
    publisher2: '',
    publisher3: '',
    publisher4: '',
    lead_designer: 'Barry.Allen',
    dev_team: 'Content Team',
    developer1: 'Arthur.Curry',
    developer2: '',
    developer3: '',
    developer4: '',
    online_features: 'New Quests, Items',
    security_features: 'Account Protection',
    live_support: '24/7'
  },
  {
    game_id: 7,
    game_name: 'Sports Mania',
    expansion_id: 9,
    expansion_name: 'Football Edition',
    genre_id: 7,
    genre_name: 'Sports',
    description: 'Realistic sports simulation',
    platforms: 'Console',
    game_director: 'Natasha.Romanoff',
    director_email: 'natasha.romanoff@gamedev.co.th',
    director_phone: '028901234',
    publisher1: 'Sports Interactive',
    publisher2: '',
    publisher3: '',
    publisher4: '',
    lead_designer: 'Clint.Barton',
    dev_team: 'Sports Division',
    developer1: 'Wanda.Maximoff',
    developer2: 'Vision',
    developer3: '',
    developer4: '',
    online_features: 'Online Matches',
    security_features: 'Fair Play System',
    live_support: 'Business Hours'
  }
];

interface ColumnGroup {
  name: string;
  columns: Column<GameDevelopmentDto, unknown>[];
}

interface ColumnSelectorProps {
  table: Table<GameDevelopmentDto>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement | null>;
  darkMode: boolean;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  table,
  isOpen,
  setIsOpen,
  triggerRef,
  darkMode
}) => {
  const [searchTerm] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Game Info': true,
    'Development': true,
    'Online Services': true
  });

  const columnGroups: ColumnGroup[] = useMemo(() => {
    return [
      {
        name: 'Game Info',
        columns: table.getAllLeafColumns().filter((col) =>
          [
            'game_id',
            'game_name',
            'expansion_name',
            'genre_name',
            'description',
            'platforms'
          ].includes(col.id))
      },
      {
        name: 'Development',
        columns: table.getAllLeafColumns().filter((col) =>
          [
            'game_director',
            'dev_team',
            'lead_designer',
            'developer1',
            'developer2',
            'developer3',
            'developer4',
            'publisher1',
            'publisher2',
            'publisher3',
            'publisher4'
          ].includes(col.id))
      },
      {
        name: 'Online Services',
        columns: table.getAllLeafColumns().filter((col) =>
          [
            'live_support',
            'online_features',
            'security_features'
          ].includes(col.id))
      }
    ];
  }, [table]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen, triggerRef]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className={`absolute top-full right-0 mt-2 rounded-lg shadow-xl border w-64 z-30 ${darkMode
        ? 'bg-gray-800 border-gray-700 text-gray-100'
        : 'bg-white border-gray-200 text-gray-900'
        }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Visible Columns</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto">
          {columnGroups.map(group => (
            <div key={group.name} className="mb-2">
              <div
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                onClick={() => toggleGroup(group.name)}
              >
                <span className="text-sm font-medium">{group.name}</span>
                <button className={`${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`}>
                  {expandedGroups[group.name] ? <Minus size={16} /> : <Plus size={16} />}
                </button>
              </div>

              {expandedGroups[group.name] && (
                <div className="mt-1 pl-1 space-y-1">
                  {group.columns
                    .filter(column => {
                      const displayName = column.columnDef.meta?.displayName || column.id;
                      return displayName.toLowerCase().includes(searchTerm.toLowerCase());
                    })
                    .map(column => (
                      <label
                        key={column.id}
                        className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                          }`}
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={column.getIsVisible()}
                            onChange={column.getToggleVisibilityHandler()}
                          />
                          <div className={`w-5 h-5 flex items-center justify-center border rounded transition-colors ${column.getIsVisible()
                            ? 'bg-purple-600 border-purple-600'
                            : darkMode
                              ? 'bg-gray-700 border-gray-500'
                              : 'bg-white border-gray-300'
                            }`}>
                            {column.getIsVisible() && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                        <span className="text-sm">
                          {column.columnDef.meta?.displayName || column.id}
                        </span>
                      </label>
                    ))
                  }
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
          <button
            onClick={() => table.toggleAllColumnsVisible(true)}
            className={`text-sm font-medium ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'
              }`}
          >
            Show All Columns
          </button>
        </div>
      </div>
    </div>
  );
};

const ReactTable: React.FC = () => {
  const [data] = useState<GameDevelopmentDto[]>(mockData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
  const columnSelectorTriggerRef = useRef<HTMLButtonElement>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    description: false,
    platforms: false,
    publisher1: false,
    publisher2: false,
    publisher3: false,
    publisher4: false,
    online_features: false,
    security_features: false
  });
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'x-large' | 'xx-large'>('medium');

  // State for advanced filters
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [selectedExpansion, setSelectedExpansion] = useState<string>('');
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>('');
  const [selectedDirector, setSelectedDirector] = useState<string>('');
  const [selectedDesigner, setSelectedDesigner] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedDevTeam, setSelectedDevTeam] = useState<string>('');
  const [copiedField, setCopiedField] = useState('');

  // State for Discord popup
  const [discordPopup, setDiscordPopup] = useState({
    open: false,
    director: '',
    discordLink: '',
    gameName: '',
    email: '',
    phone: ''
  });

  // View mode state
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  // Font size functions
  const decreaseFontSize = () => {
    if (fontSize === 'xx-large') setFontSize('x-large');
    else if (fontSize === 'x-large') setFontSize('large');
    else if (fontSize === 'large') setFontSize('medium');
    else if (fontSize === 'medium') setFontSize('small');
  };

  const increaseFontSize = () => {
    if (fontSize === 'small') setFontSize('medium');
    else if (fontSize === 'medium') setFontSize('large');
    else if (fontSize === 'large') setFontSize('x-large');
    else if (fontSize === 'x-large') setFontSize('xx-large');
  };

  // Font size classes
  const fontSizeClasses = {
    table: {
      small: 'text-xs',
      medium: 'text-sm',
      large: 'text-base',
      'x-large': 'text-lg',
      'xx-large': 'text-xl'
    },
    card: {
      small: 'text-xs',
      medium: 'text-sm',
      large: 'text-base',
      'x-large': 'text-lg',
      'xx-large': 'text-xl'
    },
    button: {
      small: 'text-[10px]',
      medium: 'text-xs',
      large: 'text-sm',
      'x-large': 'text-base',
      'xx-large': 'text-lg'
    },
    header: {
      small: 'text-base',
      medium: 'text-lg',
      large: 'text-xl',
      'x-large': 'text-2xl',
      'xx-large': 'text-3xl'
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [selectedGame, selectedExpansion, selectedDeveloper, selectedDirector, selectedDesigner, selectedGenre, selectedDevTeam]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Effect for managing body scroll when popup is open
  useEffect(() => {
    if (discordPopup.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [discordPopup.open]);

  // Get unique values for filters
  const uniqueGames = useMemo(() =>
    Array.from(new Set(data.map(item => item.game_name))), [data]);

  const uniqueExpansions = useMemo(() =>
    Array.from(new Set(data.map(item => item.expansion_name))), [data]);

  const uniqueDevelopers = useMemo(() => {
    const allDevelopers = data.flatMap(item => [
      item.developer1,
      item.developer2,
      item.developer3,
      item.developer4
    ]).filter(Boolean);
    return Array.from(new Set(allDevelopers));
  }, [data]);

  const uniqueDirectors = useMemo(() =>
    Array.from(new Set(data.map(item => item.game_director))), [data]);

  const uniqueDesigners = useMemo(() =>
    Array.from(new Set(data.map(item => item.lead_designer))), [data]);

  const uniqueGenres = useMemo(() =>
    Array.from(new Set(data.map(item => item.genre_name))), [data]);

  const uniqueDevTeams = useMemo(() =>
    Array.from(new Set(data.map(item => item.dev_team))), [data]);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const columns = useMemo<ColumnDef<GameDevelopmentDto>[]>(
    () => [
      {
        accessorKey: 'game_id',
        meta: { displayName: 'Game ID' },
        header: 'Game ID',
        cell: ({ getValue, row, table }) => {
          const rowIndex = row.index;
          const rows = table.getRowModel().rows;

          const isFirstInGroup = rowIndex === 0 ||
            rows[rowIndex].original.game_id !== rows[rowIndex - 1].original.game_id;

          return (
            <div className={`flex justify-center font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {isFirstInGroup ? (getValue() as number) : ''}
            </div>
          );
        },
      },
      {
        accessorKey: 'game_name',
        meta: {
          displayName: 'Game Name',
          filterType: 'select',
          filterOptions: uniqueGames
        },
        header: 'Game Name',
        cell: ({ getValue, row, table }) => {
          const rowIndex = row.index;
          const rows = table.getRowModel().rows;

          const isFirstInGroup = rowIndex === 0 ||
            rows[rowIndex].original.game_id !== rows[rowIndex - 1].original.game_id;

          return (
            <div className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {isFirstInGroup ? (getValue() as string) : ''}
            </div>
          );
        },
      },
      {
        accessorKey: 'expansion_name',
        meta: {
          displayName: 'Expansion',
          filterType: 'select',
          filterOptions: uniqueExpansions
        },
        header: 'Expansion',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: 'genre_name',
        meta: {
          displayName: 'Genre',
          filterType: 'select',
          filterOptions: uniqueGenres
        },
        header: 'Genre',
        cell: ({ getValue }) => (
          <div className={`flex justify-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: 'game_director',
        meta: {
          displayName: 'Game Director',
          filterType: 'select',
          filterOptions: uniqueDirectors
        },
        header: 'Director',
        cell: ({ row }) => {
          const gameDirector = row.original.game_director;
          const gameName = row.original.game_name;
          const directorEmail = row.original.director_email;
          const directorPhone = row.original.director_phone;

          return (
            <button
              className="text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-300 hover:underline focus:outline-none cursor-pointer"
              onClick={() => {
                const discordLink = directorEmail
                  ? `https://discord.com/users/${directorEmail}`
                  : '#';
                setDiscordPopup({
                  open: true,
                  director: gameDirector,
                  email: directorEmail,
                  phone: directorPhone,
                  discordLink,
                  gameName
                });
              }}
            >
              {gameDirector}
            </button>
          );
        },
      },
      {
        accessorKey: 'dev_team',
        meta: {
          displayName: 'Dev Team',
          filterType: 'select',
          filterOptions: uniqueDevTeams
        },
        header: 'Dev Team',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: 'lead_designer',
        meta: {
          displayName: 'Lead Designer',
          filterType: 'select',
          filterOptions: uniqueDesigners
        },
        header: 'Lead Designer',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: 'developer1',
        meta: {
          displayName: 'Developer 1',
          filterType: 'select',
          filterOptions: uniqueDevelopers
        },
        header: 'Dev 1',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: 'developer2',
        meta: {
          displayName: 'Developer 2',
          filterType: 'select',
          filterOptions: uniqueDevelopers
        },
        header: 'Dev 2',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: 'developer3',
        meta: {
          displayName: 'Developer 3',
          filterType: 'select',
          filterOptions: uniqueDevelopers
        },
        header: 'Dev 3',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: 'developer4',
        meta: {
          displayName: 'Developer 4',
          filterType: 'select',
          filterOptions: uniqueDevelopers
        },
        header: 'Dev 4',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: 'live_support',
        meta: { displayName: 'Live Support' },
        header: 'Live Support',
        cell: ({ getValue }) => (
          <div className="text-gray-900 dark:text-gray-100 font-medium">
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: 'description',
        meta: {
          displayName: 'Description',
          filterType: 'text'
        },
        header: 'Description',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string || '-'}
          </div>
        ),
      },
      {
        accessorKey: 'platforms',
        meta: {
          displayName: 'Platforms',
          filterType: 'text'
        },
        header: 'Platforms',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string || '-'}
          </div>
        ),
      },
      {
        accessorKey: 'publisher1',
        meta: {
          displayName: 'Publisher 1',
          filterType: 'text'
        },
        header: 'Publisher 1',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string || '-'}
          </div>
        ),
      },
      {
        accessorKey: 'publisher2',
        meta: {
          displayName: 'Publisher 2',
          filterType: 'text'
        },
        header: 'Publisher 2',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string || '-'}
          </div>
        ),
      },
      {
        accessorKey: 'publisher3',
        meta: {
          displayName: 'Publisher 3',
          filterType: 'text'
        },
        header: 'Publisher 3',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string || '-'}
          </div>
        ),
      },
      {
        accessorKey: 'publisher4',
        meta: {
          displayName: 'Publisher 4',
          filterType: 'text'
        },
        header: 'Publisher 4',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string || '-'}
          </div>
        ),
      },
      {
        accessorKey: 'online_features',
        meta: {
          displayName: 'Online Features',
          filterType: 'text'
        },
        header: 'Online Features',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string || '-'}
          </div>
        ),
      },
      {
        accessorKey: 'security_features',
        meta: {
          displayName: 'Security Features',
          filterType: 'text'
        },
        header: 'Security',
        cell: ({ getValue }) => (
          <div className={darkMode ? 'text-gray-100' : 'text-gray-900'}>
            {getValue() as string || '-'}
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columnFilters, data, darkMode]
  );

  const groupedData = useMemo<GameDevelopmentDto[]>(() => {
    const groups: GameDevelopmentDto[] = [];
    let currentGame = 0;
    let colorIndex = 0;
    const colors = darkMode ?
      ['#374151', '#1f2937'] :  // gray-700, gray-800 for dark mode
      ['#f9fafb', '#ffffff'];   // gray-50, white for light mode

    for (const item of data) {
      if (item.game_id !== currentGame) {
        currentGame = item.game_id;
        colorIndex = (colorIndex + 1) % colors.length;
      }
      groups.push({
        ...item,
        groupColor: colors[colorIndex],
        isFirstInGroup: false
      });
    }
    return groups;
  }, [data, darkMode]);

  const filteredData = useMemo<GameDevelopmentDto[]>(() => {
    let result = groupedData;

    result = groupedData.filter(item => {
      return (
        (!selectedGame || item.game_name.toLowerCase().includes(selectedGame.toLowerCase())) &&
        (!selectedExpansion || item.expansion_name.toLowerCase().includes(selectedExpansion.toLowerCase())) &&
        (!selectedDeveloper ||
          item.developer1.toLowerCase().includes(selectedDeveloper.toLowerCase()) ||
          item.developer2.toLowerCase().includes(selectedDeveloper.toLowerCase()) ||
          item.developer3.toLowerCase().includes(selectedDeveloper.toLowerCase()) ||
          item.developer4.toLowerCase().includes(selectedDeveloper.toLowerCase())) &&
        (!selectedDirector || item.game_director.toLowerCase().includes(selectedDirector.toLowerCase())) &&
        (!selectedDesigner || item.lead_designer.toLowerCase().includes(selectedDesigner.toLowerCase())) &&
        (!selectedGenre || item.genre_name.toLowerCase().includes(selectedGenre.toLowerCase())) &&
        (!selectedDevTeam || item.dev_team.toLowerCase().includes(selectedDevTeam.toLowerCase()))
      );
    });

    // Apply global filter if exists
    if (globalFilter) {
      const filterValue = globalFilter.toLowerCase();
      result = result.filter(item =>
        Object.values(item).some(val =>
          val && val.toString().toLowerCase().includes(filterValue)
        ));
    }

    // Compute isFirstInGroup for current result
    let currentGame = 0;
    return result.map((item) => {
      const isFirst = item.game_id !== currentGame;
      currentGame = item.game_id;
      return {
        ...item,
        isFirstInGroup: isFirst
      };
    });
  }, [
    groupedData,
    globalFilter,
    selectedGame,
    selectedExpansion,
    selectedDeveloper,
    selectedDirector,
    selectedDesigner,
    selectedGenre,
    selectedDevTeam
  ]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      columnFilters,
      globalFilter,
      columnVisibility
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: 'includesString',
  });

  const hiddenColumnsCount = table.getAllLeafColumns().filter(col => !col.getIsVisible()).length;
  const thaiDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    calendar: 'buddhist'
  });

  // Card view with column visibility support
  const CardView = () => {
    const visibleColumns = table.getAllLeafColumns().filter(col => col.getIsVisible());
    const visibleColumnIds = new Set(visibleColumns.map(col => col.id));

    return (
      <div className="mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-sm">
          {filteredData.map(item => (
            <div
              key={`${item.game_id}-${item.expansion_id}`}
              className={`rounded-xl shadow-lg overflow-hidden border transition-colors ${darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
                } ${fontSizeClasses.card[fontSize]}`}
            >
              {/* Header with ID */}
              <div className="bg-purple-600 px-4 py-2 sm:px-6 sm:py-3 flex justify-between items-center text-white">
                <span className="font-medium">ID</span>
                <span className="font-bold">{item.game_id}</span>
              </div>

              {/* Content with improved text colors */}
              <div className={`p-4 sm:p-6 space-y-3 sm:space-y-4 ${darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                {/* Game Name */}
                {visibleColumnIds.has('game_name') && (
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Game</span>
                    <span className={`text-right max-w-xs font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                      {item.game_name}
                    </span>
                  </div>
                )}

                {/* Expansion */}
                {visibleColumnIds.has('expansion_name') && (
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Expansion</span>
                    <span className={`text-right max-w-xs font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                      {item.expansion_name}
                    </span>
                  </div>
                )}

                {/* Genre */}
                {visibleColumnIds.has('genre_name') && (
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Genre</span>
                    <div className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full font-bold text-sm ${darkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                      }`}>
                      {item.genre_name}
                    </div>
                  </div>
                )}

                {/* Game Director */}
                {visibleColumnIds.has('game_director') && (
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Director</span>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <User size={12} className="text-white" />
                      </div>
                      <button
                        className={`cursor-pointer font-bold ${darkMode
                          ? 'text-purple-400 hover:text-purple-300'
                          : 'text-purple-600 hover:text-purple-800'
                          }`}
                        onClick={() => {
                          const discordLink = item.director_email
                            ? `https://discord.com/users/${item.director_email}`
                            : '#';
                          setDiscordPopup({
                            open: true,
                            director: item.game_director,
                            email: item.director_email,
                            phone: item.director_phone,
                            discordLink,
                            gameName: item.game_name
                          });
                        }}
                      >
                        {item.game_director}
                      </button>
                    </div>
                  </div>
                )}

                {/* Dev Team */}
                {visibleColumnIds.has('dev_team') && (
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Dev Team</span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{item.dev_team}</span>
                  </div>
                )}

                {/* Lead Designer */}
                {visibleColumnIds.has('lead_designer') && (
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Lead Designer</span>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-400 rounded-full flex items-center justify-center">
                        <User size={12} className="text-white" />
                      </div>
                      <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{item.lead_designer}</span>
                    </div>
                  </div>
                )}

                {/* Developer Grid */}
                {(visibleColumnIds.has('developer1') ||
                  visibleColumnIds.has('developer2') ||
                  visibleColumnIds.has('developer3') ||
                  visibleColumnIds.has('developer4')) && (
                    <div className="flex justify-between gap-3 pt-2">
                      {visibleColumnIds.has('developer1') && (
                        <div className="flex flex-col">
                          <span className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Developer #1</span>
                          {item.developer1 ? (
                            <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                              }`}>{item.developer1}</span>
                          ) : (
                            <span className={`text-center w-full font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>-</span>
                          )}
                        </div>
                      )}

                      {visibleColumnIds.has('developer2') && (
                        <div className="flex flex-col">
                          <span className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Developer #2</span>
                          {item.developer2 ? (
                            <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                              }`}>{item.developer2}</span>
                          ) : (
                            <span className={`text-center w-full font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>-</span>
                          )}
                        </div>
                      )}

                      {visibleColumnIds.has('developer3') && (
                        <div className="flex flex-col">
                          <span className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Developer #3</span>
                          {item.developer3 ? (
                            <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                              }`}>{item.developer3}</span>
                          ) : (
                            <span className={`text-center w-full font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>-</span>
                          )}
                        </div>
                      )}

                      {visibleColumnIds.has('developer4') && (
                        <div className="flex flex-col">
                          <span className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Developer #4</span>
                          {item.developer4 ? (
                            <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                              }`}>{item.developer4}</span>
                          ) : (
                            <span className={`text-center w-full font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>-</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                {/* Live Support */}
                {visibleColumnIds.has('live_support') && (
                  <div className="flex justify-between items-center pt-2">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Live Support</span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{item.live_support || '-'}</span>
                  </div>
                )}

                {/* Description */}
                {visibleColumnIds.has('description') && (
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Description</span>
                    <span className={`text-right max-w-xs font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                      {item.description || '-'}
                    </span>
                  </div>
                )}

                {/* Platforms */}
                {visibleColumnIds.has('platforms') && (
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Platforms</span>
                    <span className={`text-right max-w-xs font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                      {item.platforms || '-'}
                    </span>
                  </div>
                )}

                {/* Publishers */}
                {(visibleColumnIds.has('publisher1') ||
                  visibleColumnIds.has('publisher2') ||
                  visibleColumnIds.has('publisher3') ||
                  visibleColumnIds.has('publisher4')) && (
                    <div className="flex justify-between gap-3 pt-2">
                      {visibleColumnIds.has('publisher1') && (
                        <div className="flex flex-col">
                          <span className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Publisher #1</span>
                          {item.publisher1 ? (
                            <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                              }`}>{item.publisher1}</span>
                          ) : (
                            <span className={`text-center w-full font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>-</span>
                          )}
                        </div>
                      )}

                      {visibleColumnIds.has('publisher2') && (
                        <div className="flex flex-col">
                          <span className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Publisher #2</span>
                          {item.publisher2 ? (
                            <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                              }`}>{item.publisher2}</span>
                          ) : (
                            <span className={`text-center w-full font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>-</span>
                          )}
                        </div>
                      )}

                      {visibleColumnIds.has('publisher3') && (
                        <div className="flex flex-col">
                          <span className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Publisher #3</span>
                          {item.publisher3 ? (
                            <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                              }`}>{item.publisher3}</span>
                          ) : (
                            <span className={`text-center w-full font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>-</span>
                          )}
                        </div>
                      )}

                      {visibleColumnIds.has('publisher4') && (
                        <div className="flex flex-col">
                          <span className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Publisher #4</span>
                          {item.publisher4 ? (
                            <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                              }`}>{item.publisher4}</span>
                          ) : (
                            <span className={`text-center w-full font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>-</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                {/* Online Features */}
                {visibleColumnIds.has('online_features') && (
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Online Features</span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{item.online_features || '-'}</span>
                  </div>
                )}

                {/* Security Features */}
                {visibleColumnIds.has('security_features') && (
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Security</span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{item.security_features || '-'}</span>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen pb-20 ${darkMode
      ? 'bg-gray-900'
      : 'bg-gray-50'
      }`}>
      <div
        className={`w-full ${darkMode
          ? 'bg-gray-900'
          : 'bg-gradient-to-r from-purple-600 to-gray-100'
          }`}
      >
        <div className={"p-4 sm:p-6"}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className='bg-white p-3 rounded-xl flex items-center justify-center'>
                <Gamepad2 className="text-purple-600 w-8 h-8" />
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  Game Development Directory
                </h1>
              </div>
            </div>

            {/* Theme toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-colors`}
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters - Responsive Layout */}
        <div
          className={`mx-0 md:mx-6 mb-2 p-3 sm:p-4 lg:p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}
        >
          {/* First row - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-4 sm:gap-4 lg:gap-6">
            <div className="w-full">
              <label className={`block text-xs sm:text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Game Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="game-list"
                  value={selectedGame}
                  onChange={e => setSelectedGame(e.target.value)}
                  className={`w-full text-xs sm:text-sm lg:text-base border rounded-md px-3 py-1.5 sm:px-3 lg:px-4 focus:outline-none focus:ring-2 transition-colors ${darkMode
                    ? 'bg-gray-700 border-gray-600 focus:ring-purple-500 focus:border-purple-500 text-gray-100'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-gray-900'
                    }`}
                  placeholder="Type to search..."
                />
                <datalist id="game-list">
                  {uniqueGames.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="w-full">
              <label className={`block text-xs sm:text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Expansion
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="expansion-list"
                  value={selectedExpansion}
                  onChange={e => setSelectedExpansion(e.target.value)}
                  className={`w-full text-xs sm:text-sm lg:text-base border rounded-md px-3 py-1.5 sm:px-3 lg:px-4 focus:outline-none focus:ring-2 transition-colors ${darkMode
                    ? 'bg-gray-700 border-gray-600 focus:ring-purple-500 focus:border-purple-500 text-gray-100'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-gray-900'
                    }`}
                  placeholder="Type to search..."
                />
                <datalist id="expansion-list">
                  {uniqueExpansions.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="w-full">
              <label className={`block text-xs sm:text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Developer
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="developer-list"
                  value={selectedDeveloper}
                  onChange={e => setSelectedDeveloper(e.target.value)}
                  className={`w-full text-xs sm:text-sm lg:text-base border rounded-md px-3 py-1.5 sm:px-3 lg:px-4 focus:outline-none focus:ring-2 transition-colors ${darkMode
                    ? 'bg-gray-700 border-gray-600 focus:ring-purple-500 focus:border-purple-500 text-gray-100'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-gray-900'
                    }`}
                  placeholder="Type to search..."
                />
                <datalist id="developer-list">
                  {uniqueDevelopers.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="w-full sm:col-span-2 lg:col-span-1">
              <label className={`block text-xs sm:text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Game Director
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="director-list"
                  value={selectedDirector}
                  onChange={e => setSelectedDirector(e.target.value)}
                  className={`w-full text-xs sm:text-sm lg:text-base border rounded-md px-3 py-1.5 sm:px-3 lg:px-4 focus:outline-none focus:ring-2 transition-colors ${darkMode
                    ? 'bg-gray-700 border-gray-600 focus:ring-purple-500 focus:border-purple-500 text-gray-100'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-gray-900'
                    }`}
                  placeholder="Type to search..."
                />
                <datalist id="director-list">
                  {uniqueDirectors.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          {/* Second row - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="w-full">
              <label className={`block text-xs sm:text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Lead Designer
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="designer-list"
                  value={selectedDesigner}
                  onChange={e => setSelectedDesigner(e.target.value)}
                  className={`w-full text-xs sm:text-sm lg:text-base border rounded-md px-3 py-1.5 sm:px-3 lg:px-4 focus:outline-none focus:ring-2 transition-colors ${darkMode
                    ? 'bg-gray-700 border-gray-600 focus:ring-purple-500 focus:border-purple-500 text-gray-100'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-gray-900'
                    }`}
                  placeholder="Type to search..."
                />
                <datalist id="designer-list">
                  {uniqueDesigners.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="w-full">
              <label className={`block text-xs sm:text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Genre
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="genre-list"
                  value={selectedGenre}
                  onChange={e => setSelectedGenre(e.target.value)}
                  className={`w-full text-xs sm:text-sm lg:text-base border rounded-md px-3 py-1.5 sm:px-3 lg:px-4 focus:outline-none focus:ring-2 transition-colors ${darkMode
                    ? 'bg-gray-700 border-gray-600 focus:ring-purple-500 focus:border-purple-500 text-gray-100'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-gray-900'
                    }`}
                  placeholder="Type to search..."
                />
                <datalist id="genre-list">
                  {uniqueGenres.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="w-full sm:col-span-2 lg:col-span-1 xl:col-span-1">
              <label className={`block text-xs sm:text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Dev Team
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="devteam-list"
                  value={selectedDevTeam}
                  onChange={e => setSelectedDevTeam(e.target.value)}
                  className={`w-full text-xs sm:text-sm lg:text-base border rounded-md px-3 py-1.5 sm:px-3 lg:px-4 focus:outline-none focus:ring-2 transition-colors ${darkMode
                    ? 'bg-gray-700 border-gray-600 focus:ring-purple-500 focus:border-purple-500 text-gray-100'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-gray-900'
                    }`}
                  placeholder="Type to search..."
                />
                <datalist id="devteam-list">
                  {uniqueDevTeams.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>
        </div>

        {/* View */}
        <div className={`flex flex-wrap justify-between items-center gap-2 sm:gap-3 py-2 px-4 md:px-10 rounded-t-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Sort: All {table.getFilteredRowModel().rows.length} rows
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font size controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize === 'small'}
                className={`px-3 py-1.5 rounded-md border transition-colors ${darkMode
                  ? fontSize === 'small'
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-600'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                  : fontSize === 'small'
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                  }`}
                title="Decrease font size"
              >
                A-
              </button>

              <button
                onClick={increaseFontSize}
                disabled={fontSize === 'xx-large'}
                className={`px-3 py-1.5 rounded-md border transition-colors ${darkMode
                  ? fontSize === 'xx-large'
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-600'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                  : fontSize === 'xx-large'
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                  }`}
                title="Increase font size"
              >
                A+
              </button>
            </div>

            <div className="relative">
              <button
                ref={columnSelectorTriggerRef}
                onClick={() => setIsColumnSelectorOpen(prev => !prev)}
                className={`flex items-center gap-1 text-xs sm:text-sm border rounded-lg px-3 py-2 transition-colors ${darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <Columns className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Columns</span>
                {hiddenColumnsCount > 0 && (
                  <span className={`text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center ${darkMode
                    ? 'bg-white text-gray-900'
                    : 'bg-purple-600 text-white'
                    }`}>
                    {hiddenColumnsCount}
                  </span>
                )}
              </button>
              <ColumnSelector
                table={table}
                isOpen={isColumnSelectorOpen}
                setIsOpen={setIsColumnSelectorOpen}
                triggerRef={columnSelectorTriggerRef}
                darkMode={darkMode}
              />
            </div>

            {/* View mode toggle buttons */}
            <button
              onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
              className={`mr-0 lg:mr-2 p-2.5 rounded-lg border transition-colors ${darkMode
                ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                }`}
              title={viewMode === 'table' ? 'Switch to Card View' : 'Switch to Table View'}
            >
              {viewMode === 'table' ?
                <LayoutGrid className="w-3 h-3 sm:w-4 sm:h-4" /> :
                <Menu className="w-3 h-3 sm:w-4 sm:h-4" />
              }
            </button>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Card View */}
          {viewMode === 'card' && <CardView />}

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className={`w-full min-w-max ${fontSizeClasses.table[fontSize]}`}>
                <thead className="bg-purple-600 text-white sticky top-0 z-10">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => {
                        if (!header.column.getIsVisible()) return null;

                        return (
                          <th
                            key={header.id}
                            className="px-2 sm:px-4 py-2 text-left bg-purple-600"
                          >
                            <div className="min-w-0">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {table.getFilteredRowModel().rows.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="px-4 py-12 text-center">
                        <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No games found</p>
                          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            Try adjusting your search or filters
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row, index) => {
                      const rowData = row.original;
                      const nextRow = table.getRowModel().rows[index + 1];
                      const isLastInGroup = !nextRow || nextRow.original.game_id !== rowData.game_id;

                      return (
                        <tr
                          key={`${rowData.game_id}-${rowData.expansion_id}`}
                          style={{ backgroundColor: rowData.groupColor }}
                          className={`hover:bg-opacity-90 transition-colors ${isLastInGroup ? 'border-b-[1px] border-gray-300' : ''
                            }`}
                        >
                          {row.getVisibleCells().map(cell => {
                            return (
                              <td
                                key={cell.id}
                                className={`px-2 py-1 sm:px-4 sm:py-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'
                                  }`}
                              >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`fixed bottom-0 left-0 right-0 px-4 py-3 sm:px-6 sm:py-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
          }`}>
          <div className={`flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
            <div>
              Showing {table.getFilteredRowModel().rows.length} of {data.length} games
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {hiddenColumnsCount > 0 && (
                <div className={`text-xs px-2 py-1 rounded-md ${darkMode
                  ? 'bg-purple-900 text-purple-200'
                  : 'bg-purple-50 text-purple-700'
                  }`}>
                  {hiddenColumnsCount} column{hiddenColumnsCount > 1 ? 's' : ''} hidden
                </div>
              )}
              <div className="text-xs sm:text-sm">
                <span>Last updated: {thaiDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discord Popup */}
      {discordPopup.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl shadow-2xl w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
            <div className="flex justify-between items-center p-6 pb-4">
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                Contact Information
              </h3>
              <button
                onClick={() => setDiscordPopup(prev => ({ ...prev, open: false }))}
                className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 pb-6 space-y-4">
              <div className="flex flex-col gap-1">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Game</span>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{discordPopup.gameName}</span>
              </div>
              
              {/* Email Section */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                    <Mail className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                  </div>
                  <a
                    href={`https://outlook.office.com/mail/deeplink/compose?to=${discordPopup.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={darkMode ? 'text-gray-200 hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'}
                    style={{ textDecoration: 'none' }}
                  >
                    {discordPopup.email}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(discordPopup.email, 'email')}
                  className={`w-8 h-8 flex items-center justify-center rounded-md transition-all ${darkMode
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}
                  title="Copy email"
                >
                  {copiedField === 'email' ? (
                    <div className="w-4 h-4 text-green-500">✓</div>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone Section */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                    <Phone className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                  </div>
                  <span className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
                    {discordPopup.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 p-6 pt-0">
              <button
                className={`px-6 py-2 border rounded-lg transition-colors ${darkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                onClick={() => setDiscordPopup(prev => ({ ...prev, open: false }))}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors`}
                onClick={() => window.open(discordPopup.discordLink)}
              >
                <Disc className="w-4 h-4" />
                Join Discord
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactTable;