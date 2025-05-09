import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { performSearch, searchableContent } from '@/utils/searchLogic';
import { performMetadataSearch, searchableMetadata } from '@/utils/metadataSearchLogic';
import { RiArrowRightSLine } from 'react-icons/ri';
import { IoMdClose } from "react-icons/io";


type IProps = {
  closePop: () => void;
  trainee: boolean;
};

type CombinedSearchResult = typeof searchableContent & typeof searchableMetadata;

const Search: React.FC<IProps> = ({ closePop, trainee }) => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<CombinedSearchResult[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    // Perform the search and update the searchResults state
    const contentResults = performSearch(searchQuery);
    const metadataResults = performMetadataSearch(searchQuery);
    const combinedResults = [
      ...contentResults,
      ...metadataResults.map(item => ({
        ...item,
        url: item.route,
        content: item.description,
      })),
    ] as CombinedSearchResult[];

    setSearchResults(combinedResults);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopWithAnimation();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closePop]);

  const closePopWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      closePop();
    },1000); // Adjust timing to match CSS transition duration
  };

  const handleLinkClick = (url: string) => {
    closePopWithAnimation(); // Close the search popup with fade-out effect
    router.push(url); // Navigate to the specified URL
  };

  // Group results by route
  const groupedResults = searchResults.reduce((acc, result) => {
    const { route } = result;
    if (!acc[route]) {
      acc[route] = [];
    }
    acc[route].push(result);
    return acc;
  }, {} as { [key: string]: CombinedSearchResult[] });

  return (
    <div className={`blur-container ${isClosing ? 'fade-out' : ''}`} style={styles.blurContainer}>
      <div className="callout" style={styles.callout}></div>
      <div className={`search searchMain ${isClosing ? 'fade-out-animation' : ''}`} style={styles.searchMain}>
        <div className="fixed-top" style={styles.fixedTop}>
          <button className="RightPlace" onClick={closePopWithAnimation} style={styles.closeButton}>
            <IoMdClose size={32} color="#333" />
          </button>
          <div className="relative" style={styles.searchInputContainer}>
            <input
              type="text"
              className="inputSearch w-100"
              value={query}
              onChange={handleSearch}
              style={styles.searchInput}
            />
            {/* <RiSearchLine size={24} color="#333" style={styles.searchIcon} /> */}
          </div>
          <h3 className="searchHeader mt-2" style={styles.searchHeader}>
            {searchResults.length} Results found
          </h3>
          <div className="borderDashed mb-2"></div>
        </div>
        <div className="results-container" style={styles.resultsContainer}>
          {Object.keys(groupedResults).map((route, index) => (
            <div key={index}>
              <hr className='h-[.5px] mt-2 mb-1 bg-app-blue' />
              {/* <h4>{route}</h4> */}
              {groupedResults[route].map((result, idx) => (
                <div key={idx} className="result-item cursor-pointer">
                  {trainee ? (
                    <a className="yellowBox flex" onClick={() => handleLinkClick(result.traineeRoute || '/')}>
                      <p className="yellowBoxText">
                        <span className="theme-color">
                          <b>{result.title}</b>
                        </span>
                      </p>
                      <p className="yellowBoxDate flex flex-row">
                        {result.description}
                        <RiArrowRightSLine size={24} color="#333" />
                      </p>
                    </a>
                  ) : (
                    <a className="yellowBox flex" onClick={() => handleLinkClick(`${result.route}?searchKey=${result.params}`)}>
                      <p className="yellowBoxText">
                        <span className="theme-color">
                          <div className="flex flex-row">
                            <div className="flex">
                              <b>{result.title}</b>
                            </div>
                            <div className="flex">
                              {result.description}
                            </div>
                            <div className="flex">
                              <RiArrowRightSLine size={24} color="#333" />
                            </div>
                          </div>
                        </span>
                      </p>
                    </a>
                  )}
                </div>
              ))}
            </div>
          ))}
          {/* {searchResults.length === 0 && query && <p>No results found.</p>} */}
        </div>
      </div>
    </div>
  );
};

const styles = {
    blurContainer: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(2px)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callout: {
    position: 'absolute' as 'absolute',
    top: '38px',
    right: '15rem',
    width: 0,
    height:0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '22px solid #F1F3FF',
    zIndex: 1001,        
  },
  searchMain: {
    position: 'absolute' as 'absolute',
    backgroundColor: '#F1F3FF',
    padding: '20px',
    borderRadius: '18px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: 'calc(540px - 3rem)',
    maxHeight: '514px',
    overflowY: 'hidden',
    marginRight: '10rem',    
  },
  fixedTop: {
    position: 'sticky' as 'sticky',
    top: 0,
    backgroundColor: '#F1F3FF',
    zIndex: 10,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  searchInputContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '7px',
  },
  searchInput: {
    flex: 1,
    padding: '10px',
    borderRadius: '18px',
    border: '1px solid #ccc',
  },
  searchIcon: {
    paddingRight: '5px',
  },
  searchHeader: {
    marginTop: '10px',
  },
  resultsContainer: {
    marginTop: '10px',
    overflowY: 'auto' as 'auto',
    maxHeight: '400px',
  },
};

export default Search;
