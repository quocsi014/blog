import {
  Pagination as P,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationPropsType = {
  currentPage: number;
  totalPage: number;
  className?: string
};

function Disable({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled: boolean;
}) {
  return (
    <>
      {disabled ? (
        <button className='pointer-events-none opacity-25'>{children}</button>
      ) : (
        children
      )}
    </>
  );
}

export function Pagination({ currentPage, totalPage, className }: PaginationPropsType) {
  return (
    <P className={className}>
      <PaginationContent>
        <PaginationItem>
          <Disable disabled={currentPage == 1}>
            <PaginationPrevious to={`?page=${currentPage - 1}`} />
          </Disable>
        </PaginationItem>
        {currentPage > 3 ? (
          <PaginationItem>
            <PaginationLink to='?page=1'>{1}</PaginationLink>
          </PaginationItem>
        ) : (
          <></>
        )}
        {currentPage > 4 ? (
          <PaginationItem>
            <PaginationLink to='?page=2'>{2}</PaginationLink>
          </PaginationItem>
        ) : (
          <></>
        )}
        {currentPage > 5 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : (
          <></>
        )}

        {currentPage > 2 ? (
          <PaginationItem>
            <PaginationLink to={`?page=${currentPage - 2}`}>
              {currentPage - 2}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <></>
        )}
        {currentPage > 1 ? (
          <PaginationItem>
            <PaginationLink to={`?page=${currentPage - 1}`}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <></>
        )}
        <PaginationItem>
          <PaginationLink to='#' isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {currentPage < totalPage ? (
          <PaginationItem>
            <PaginationLink to={`?page=${currentPage + 1}`}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <></>
        )}
        {currentPage < totalPage - 1 ? (
          <PaginationItem>
            <PaginationLink to={`?page=${currentPage + 2}`}>
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <></>
        )}
        {currentPage < totalPage - 4 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : (
          <></>
        )}
        {currentPage < totalPage - 3 ? (
          <PaginationItem>
            <PaginationLink to={`?page=${totalPage-1}`}>
              {totalPage - 1}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <></>
        )}
        {currentPage < totalPage - 2 ? (
          <PaginationItem>
            <PaginationLink to={`?page=${totalPage}`}>
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <></>
        )}
        <PaginationItem>
          <Disable disabled={currentPage == totalPage}>
            <PaginationNext to={`?page=${currentPage + 1}`} />
          </Disable>
        </PaginationItem>
      </PaginationContent>
    </P>
  );
}
